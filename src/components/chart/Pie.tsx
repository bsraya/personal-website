import { onMount } from 'solid-js';
import { Chart, Title, Tooltip, Legend, Colors } from 'chart.js';
import { Pie } from 'solid-chartjs';
import type { PieChartData } from '../../types/chart';


export default function PieChart(
  { data, height, width, options}:
    { data: PieChartData, height: number, width: number, options: any }
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
      <Pie data={data} options={chartOptions} width={width} height={height} />
    </div>
  )
}
