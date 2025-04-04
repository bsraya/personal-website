import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'solid-chartjs';
import type { BarChartData } from '../../types/chart';


export default function BarChart(
  { data, height, width }:
    { data: BarChartData, height: number, width: number }
) {
  onMount(() => {
    Chart.register(Title, Tooltip, Legend);
  })

  const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
  }

  return (
    <div class="my-10">
      <Bar data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}
