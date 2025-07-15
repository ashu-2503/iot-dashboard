import React, { useState } from 'react';

const availableSensors = ['SEN-001', 'SEN-002', 'SEN-003'];

function SensorForm({ onSubmit }) {
  const [selectedSensors, setSelectedSensors] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const toggleSensor = (sensorId) => {
    setSelectedSensors((prev) =>
      prev.includes(sensorId)
        ? prev.filter((id) => id !== sensorId)
        : [...prev, sensorId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSensors.length || !start || !end) {
      alert('Please select sensors and a valid date range');
      return;
    }
    onSubmit({ selectedSensors, start, end });
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '20px',
      }}
    >
      <fieldset
        style={{
          border: '1px solid gray',
          padding: '10px',
          display: 'flex',
          gap: '10px',
          borderRadius: '5px',
        }}
      >
        <legend>Choose Sensors</legend>
        {availableSensors.map((sensor) => (
          <label key={sensor} style={{ marginRight: '15px' }}>
            <input
              type="checkbox"
              value={sensor}
              checked={selectedSensors.includes(sensor)}
              onChange={() => toggleSensor(sensor)}
            />
            {sensor}
          </label>
        ))}
      </fieldset>

      <label>
        Start:
        <input
          type="datetime-local"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
      </label>

      <label>
        End:
        <input
          type="datetime-local"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
        />
      </label>

      <button type="submit" style={{ padding: '8px 14px' }}>
        Plot Graph
      </button>
    </form>
  )
}

export default SensorForm;
