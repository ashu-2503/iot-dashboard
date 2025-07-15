import React, { useState } from 'react'
import SensorChart from './components/SensorChart'
import SensorForm from './components/SensorForm'
import { fetchSensorReadings } from './api/sensorApi'
import Sensor3DChart from './components/Sensor3DChart'

const SENSOR_COLORS = {
  'SEN-001': 'cyan',
  'SEN-002': 'orange',
  'SEN-003': 'lime',
}

function App() {
  const [chartData, setChartData] = useState(null)
  const [threeDData, setThreeDData] = useState(null)
  const [show3DChart, setShow3DChart] = useState(false)

  const handleFormSubmit = async ({ selectedSensors, start, end }) => {
    const data = await fetchSensorReadings(selectedSensors, start, end)

    const timestamps = [...new Set(data.map((d) => d.timestamp))].sort()

    const grouped = selectedSensors.map((id) => ({
      id,
      amplitude: timestamps.map((t) => {
        const reading = data.find((d) => d.timestamp === t && d.sensorId === id)
        return reading ? reading.amplitude : null
      }),
      frequency: timestamps.map((t) => {
        const reading = data.find((d) => d.timestamp === t && d.sensorId === id)
        return reading ? reading.frequency : null
      }),
    }))

    const datasets = []

    grouped.forEach((sensor) => {
      const color = SENSOR_COLORS[sensor.id] || 'gray'

      datasets.push({
        label: `Amplitude - ${sensor.id}`,
        data: sensor.amplitude,
        borderColor: color,
        backgroundColor: color,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
      })

      datasets.push({
        label: `Frequency - ${sensor.id}`,
        data: sensor.frequency,
        borderColor: color,
        backgroundColor: color,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        borderDash: [6, 6],
      })
    })

    // Threshold lines
    datasets.push({
      label: 'Amplitude Threshold',
      data: new Array(timestamps.length).fill(6.5),
      borderColor: 'red',
      borderWidth: 1,
      borderDash: [2, 2],
      pointRadius: 0,
    })

    datasets.push({
      label: 'Frequency Threshold',
      data: new Array(timestamps.length).fill(70),
      borderColor: 'yellow',
      borderWidth: 1,
      borderDash: [2, 2],
      pointRadius: 0,
    })

    setChartData({
      labels: timestamps,
      datasets,
    })

    // Prepare 3D data: [[timestampIndex, amplitude, frequency], ...]
    const scatter3D = data.map((d) => [
      timestamps.indexOf(d.timestamp),
      d.amplitude,
      d.frequency,
      d.sensorId,
    ])

    setThreeDData({ scatter3D, timestamps })
  }

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'sans-serif',
        backgroundColor: '#121212',
        color: 'white',
        height: '100vh',
      }}
    >
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '15px',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="/vite.svg"
            alt="logo"
            style={{ width: '40px', marginRight: '10px' }}
          />
          <h1 style={{ margin: 0 }}>IoT Sensor Dashboard</h1>
        </div>

        <button
          onClick={() => setShow3DChart((prev) => !prev)}
          style={{
            padding: '8px 16px',
            background: show3DChart ? 'darkorange' : 'teal',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          {show3DChart ? 'Show 2D Chart' : 'Show 3D Chart'}
        </button>
      </header>

      <div style={{ marginBottom: '15px' }}>
        <SensorForm onSubmit={handleFormSubmit} />
      </div>

      <div style={{ width: '100%', height: '75vh' }}>
        {show3DChart
          ? threeDData && <Sensor3DChart data={threeDData} />
          : chartData && <SensorChart data={chartData} />}
      </div>
    </div>
  )
}

export default App
