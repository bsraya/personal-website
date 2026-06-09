import { visit, EXIT } from 'unist-util-visit';

/**
 * Rehype plugin that transforms GFM footnotes into inline sidenotes.
 *
 * Input (from remark-gfm via Astro):
 *   <p>Text<sup><a href="#user-content-fn-1" data-footnote-ref="">1</a></sup></p>
 *   ...
 *   <section data-footnotes class="footnotes">
 *     <ol><li id="user-content-fn-1"><p>Note text. <a data-footnote-backref>↩</a></p></li></ol>
 *   </section>
 *
 * Output:
 *   <p>Text<sup><span data-footnote-ref>1</span></sup></p>
 *   <aside class="sidenote"><span class="sidenote-number">1</span>&nbsp;Note text.</aside>
 *   (footnotes section removed, ref <a> converted to <span> to avoid Anchor.astro processing)
 */
export function rehypeSidenotes() {
  return (tree) => {
    // ── Step 1: build footnote content map ──────────────────────────────────
    const footnoteMap = new Map(); // "user-content-fn-1" → hast children[]
    let footnotesSection = null;

    visit(tree, 'element', (node) => {
      if (node.tagName !== 'section') return;
      if (!('dataFootnotes' in (node.properties ?? {}))) return;

      footnotesSection = node;

      const ol = node.children.find(
        (c) => c.type === 'element' && c.tagName === 'ol'
      );
      if (!ol) return;

      for (const li of ol.children) {
        if (li.type !== 'element' || li.tagName !== 'li') continue;
        const fnId = li.properties?.id;
        if (!fnId) continue;

        const cloned = JSON.parse(JSON.stringify(li.children));
        const stripped = stripBackref(cloned);
        const unwrapped = unwrapSingleParagraph(stripped);
        footnoteMap.set(fnId, unwrapped);
      }
    });

    if (!footnotesSection || footnoteMap.size === 0) return;

    // ── Step 2: find <p> elements that cite footnotes ────────────────────────
    const insertions = []; // { parent, afterIndex, asides[] }

    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === undefined) return;

      const refs = collectFootnoteRefs(node);
      if (refs.length === 0) return;

      const asides = refs
        .map(({ fnId, num }) => {
          const content = footnoteMap.get(fnId);
          if (!content) return null;
          return makeAside(num, content);
        })
        .filter(Boolean);

      if (asides.length > 0) {
        insertions.push({ parent, afterIndex: index, asides });
      }
    });

    // ── Step 3: apply insertions back-to-front so indices stay valid ─────────
    insertions.sort((a, b) => b.afterIndex - a.afterIndex);
    for (const { parent, afterIndex, asides } of insertions) {
      parent.children.splice(afterIndex + 1, 0, ...asides);
    }

    // ── Step 4: remove the original footnotes section ────────────────────────
    visit(tree, 'element', (node, index, parent) => {
      if (node === footnotesSection && parent && index !== undefined) {
        parent.children.splice(index, 1);
        return EXIT;
      }
    });

    // ── Step 5: convert ref <a> → <span> so Anchor.astro doesn't add
    //           target="_blank" / rel="noopener" to dead fragment links ────────
    visit(tree, 'element', (node) => {
      if (
        node.tagName === 'a' &&
        'dataFootnoteRef' in (node.properties ?? {})
      ) {
        node.tagName = 'span';
        delete node.properties.href;
        delete node.properties.id;
        delete node.properties.ariaDescribedby;
      }
    });
  };
}

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Recursively collect all data-footnote-ref anchors within a node subtree. */
function collectFootnoteRefs(node, refs = []) {
  if (
    node.type === 'element' &&
    node.tagName === 'a' &&
    'dataFootnoteRef' in (node.properties ?? {})
  ) {
    const href = node.properties.href; // "#user-content-fn-1"
    const num = node.children?.[0]?.value ?? '';
    if (href) refs.push({ fnId: href.slice(1), num });
    return refs; // don't recurse into the anchor itself
  }
  for (const child of node.children ?? []) {
    collectFootnoteRefs(child, refs);
  }
  return refs;
}

/** Remove data-footnote-backref anchors and trailing whitespace text nodes. */
function stripBackref(nodes) {
  return nodes
    .map((node) => {
      if (
        node.type === 'element' &&
        node.tagName === 'a' &&
        'dataFootnoteBackref' in (node.properties ?? {})
      ) {
        return null; // drop backref anchor
      }
      if (node.type === 'element' && node.children) {
        return { ...node, children: stripBackref(node.children).filter(Boolean) };
      }
      return node;
    })
    .filter(Boolean)
    .filter((node, i, arr) => {
      // Trim trailing whitespace-only text nodes
      if (node.type === 'text' && node.value.trim() === '' && i === arr.length - 1) {
        return false;
      }
      return true;
    });
}

/**
 * If the content is a single <p>, unwrap it so the aside doesn't gain extra
 * block-level spacing from nested paragraph margins.
 */
function unwrapSingleParagraph(nodes) {
  const meaningful = nodes.filter(
    (n) => !(n.type === 'text' && n.value.trim() === '')
  );
  if (
    meaningful.length === 1 &&
    meaningful[0].type === 'element' &&
    meaningful[0].tagName === 'p'
  ) {
    return meaningful[0].children;
  }
  return nodes;
}

/** Build an <aside class="sidenote"> hast node. */
function makeAside(num, content) {
  return {
    type: 'element',
    tagName: 'aside',
    properties: { className: ['sidenote'] },
    children: [
      {
        type: 'element',
        tagName: 'span',
        properties: { className: ['sidenote-number'] },
        children: [{ type: 'text', value: num }],
      },
      { type: 'text', value: '\u00a0' }, // non-breaking space between number and text
      ...content,
    ],
  };
}
