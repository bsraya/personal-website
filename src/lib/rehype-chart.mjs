import { visit } from 'unist-util-visit';

export function remarkChart() {
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      if (node.lang !== 'chart' || !parent || index === undefined) return;

      const config = JSON.parse(node.value);
      const height = config.height ?? 400;
      const width = config.width ?? '100%';
      delete config.height;
      delete config.width;

      const dataChart = JSON.stringify(config).replace(/"/g, '&quot;');

      parent.children[index] = {
        type: 'html',
        value: `<div class="chart-container" data-chart="${dataChart}" style="height:${height}px;width:${width};"></div>`
      };
    });
  };
}
