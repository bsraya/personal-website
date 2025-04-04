import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend } from 'chart.js';
import { Pie } from 'solid-chartjs';
import type { PieChartData } from '../../types/chart';


export default function PieChart(
  { data, height, width }:
    { data: PieChartData, height: number, width: number }
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
      <Pie data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}
