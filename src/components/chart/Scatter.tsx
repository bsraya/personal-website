import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Scatter } from 'solid-chartjs';
import type { ScatterChartData } from '../../types/chart';

export default function ScatterChart(
  { data, height, width, options }:
    { data: ScatterChartData, height: number, width: number, options: any }
) {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  })

  const chartOptions = {
    response: true,
    maintainAspectRatio: false,
    ...options
  }

  return (
    <div class="my-10">
      <Scatter data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}