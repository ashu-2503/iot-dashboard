package com.example.iot_monitoring.service

import com.example.iot_monitoring.model.SensorReading
import com.example.iot_monitoring.repository.SensorReadingRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class SensorDataService(
    private val sensorReadingRepository: SensorReadingRepository
) {
    fun getSensorReadings(sensorIds: List<String>, start: LocalDateTime, end: LocalDateTime): List<SensorReading> {
        return sensorReadingRepository
            .findAllBySensorIdInAndTimestampBetween(sensorIds, start, end)
//            .sortedBy { it.timestamp }
    }
}
