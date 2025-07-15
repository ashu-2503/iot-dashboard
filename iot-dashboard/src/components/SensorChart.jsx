import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
)

function SensorChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index',
      intersect: false, // allow hover anywhere along vertical line
    },
    plugins: {
      legend: {
        labels: {
          color: 'white',
        },
      },
      tooltip: {
        mode: 'index',
        // mode: 'nearest',
        intersect: false,
        // intersect: true,
        filter: function (tooltipItem) {
          return !tooltipItem.dataset.label.includes('Threshold')
        },
      },
    },
    scales: {
      x: {
        ticks: { color: 'white' },
        grid: { color: '#333' },
      },
      y: {
        ticks: { color: 'white' },
        grid: { color: '#333' },
      },
    },
  }

  return (
    <div style={{ height: '100%' }}>
      <h2>📈 Sensor Readings</h2>
      <Line data={data} options={options} />
    </div>
  )
}

export default SensorChart
