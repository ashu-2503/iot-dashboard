import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import 'echarts-gl'

const SENSOR_COLORS = {
  'SEN-001': 'cyan',
  'SEN-002': 'orange',
  'SEN-003': 'lime',
}

const SENSOR_IDS = ['SEN-001', 'SEN-002', 'SEN-003']

function Sensor3DChart({ data }) {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!data || !data.scatter3D) return

    const chart = echarts.init(chartRef.current)

    const points = {}

    data.scatter3D.forEach(([_, amplitude, frequency, sensorId]) => {
      const sensorIndex = SENSOR_IDS.indexOf(sensorId)
      if (sensorIndex === -1) return

      if (!points[sensorId]) points[sensorId] = []
      points[sensorId].push([sensorId, amplitude, frequency])
    })

    const series = Object.entries(points).map(([sensorId, pointList]) => ({
      name: sensorId,
      type: 'scatter3D',
      data: pointList,
      symbolSize: 5,
      itemStyle: {
        color: SENSOR_COLORS[sensorId] || 'gray',
      },
    }))

    // Threshold markers
    const amplitudeThreshold = SENSOR_IDS.map((sid) => [sid, 6.5, 60])
    const frequencyThreshold = SENSOR_IDS.map((sid) => [sid, 4, 70])

    series.push(
      {
        name: 'Amplitude Threshold',
        type: 'scatter3D',
        data: amplitudeThreshold,
        symbolSize: 6,
        itemStyle: { color: 'red' },
      },
      {
        name: 'Frequency Threshold',
        type: 'scatter3D',
        data: frequencyThreshold,
        symbolSize: 6,
        itemStyle: { color: 'purple' },
      }
    )

    chart.setOption({
      backgroundColor: 'rgba(241, 239, 239, 0.8)',
      tooltip: {
        backgroundColor: '#333',
        textStyle: { color: '#fff' },
        formatter: (params) => {
          const [sensor, amp, freq] = params.value
          return `
            <strong>${params.seriesName}</strong><br/>
            Sensor: ${sensor}<br/>
            Amplitude: ${amp?.toFixed(2) || '-'}<br/>
            Frequency: ${freq?.toFixed(2) || '-'}
          `
        },
      },
      xAxis3D: {
        name: 'Sensor',
        type: 'category',
        data: SENSOR_IDS,
        axisLabel: { color: '#000' },
        nameTextStyle: { color: '#000' },
        axisLine: { lineStyle: { color: '#000' } },
      },
      yAxis3D: {
        name: 'Frequency',
        type: 'value',
        axisLabel: { color: '#000' },
        nameTextStyle: { color: '#000' },
        axisLine: { lineStyle: { color: '#000' } },
      },
      zAxis3D: {
        name: 'Amplitude',
        type: 'value',
        axisLabel: { color: '#000' },
        nameTextStyle: { color: '#000' },
        axisLine: { lineStyle: { color: '#000' } },
      },
      grid3D: {
        boxWidth: 100,
        boxDepth: 100,
        axisPointer: {
          lineStyle: { color: '#888' },
        },
        viewControl: {
          projection: 'perspective',
        },
      },
      series,
    })

    return () => chart.dispose()
  }, [data])

  return <div ref={chartRef} style={{ height: '100%', width: '100%' }} />
}

export default Sensor3DChart
