import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'solid-chartjs';
import type { LineChartData } from '../../types/chart';


export default function LineChart(
  { data, height, width }:
    { data: LineChartData, height: number, width: number }
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
      <Line data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}
