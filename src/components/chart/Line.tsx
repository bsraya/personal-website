import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Line } from 'solid-chartjs';
import type { LineChartData } from '../../types/chart';


export default function LineChart(
  { data, height, width, options }:
    { data: LineChartData, height: number, width: number, options: any }
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
    <div class="my-5">
      <Line data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}
