import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend } from 'chart.js';
import { Scatter } from 'solid-chartjs';
import type { ScatterChartData } from '../../types/chart';

export default function ScatterChart(
  { data, height, width }:
  { data: ScatterChartData, height: number, width: number}
) {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend);
  })

  const chartOptions = {
    response: true,
    maintainAspectRatio: false,
  }

  return (
    <div class="my-10">
      <Scatter data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}