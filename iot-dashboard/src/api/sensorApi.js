import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';



export const fetchSensorReadings = async (sensorIds, start, end) => {
  const response = await axios.get(`${BASE_URL}/sensor-readings`, {
    params: {
      sensorIds: sensorIds.join(','),  // 🧠 Converts array to comma-separated
      start,
      end
    }
  });
  return response.data;
};
