import Blockquote from "@mdxComponent/Blockquote.astro";
import H1 from "@mdxComponent/H1.astro";
import H2 from "@mdxComponent/H2.astro";
import H3 from "@mdxComponent/H3.astro";
import H4 from "@mdxComponent/H4.astro";
import Li from "@component/mdx/Li.astro";
import OrderedList from "@mdxComponent/OrderedList.astro";
import UnorderedList from "@mdxComponent/UnorderedList.astro";
import HorizontalRule from "@mdxComponent/HorizontalRule.astro";
import Table from "@mdxComponent/Table.astro";
import TableRow from "@mdxComponent/TableRow.astro";
import TableHeader from "@mdxComponent/TableHeader.astro";
import TableData from "@mdxComponent/TableData.astro";
import Anchor from "@mdxComponent/Anchor.astro";
import Img from "@mdxComponent/Img.astro";
import Paragraph from "@mdxComponent/Paragraph.astro";

export const MdxComponents = {
    h1: H1,
    h2: H2,
    h3: H3,
    h4: H4,
    ol: OrderedList,
    ul: UnorderedList,
    li: Li,
    hr: HorizontalRule,
    a: Anchor,
    table: Table,
    th: TableHeader,
    tr: TableRow,
    td: TableData,
    blockquote: Blockquote,
    img: Img,
    p: Paragraph,
}