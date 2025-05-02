import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Bar } from 'solid-chartjs';
import type { BarChartData } from '@type/chart';


export default function BarChart(
  { data, height, width, options }:
    { data: BarChartData, height: number, width: number, options: any }
) {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend, Colors);
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    ...options
  }

  return (
    <div class="my-10">
      <Bar data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}
