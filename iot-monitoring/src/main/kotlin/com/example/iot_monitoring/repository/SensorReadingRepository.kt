package com.example.iot_monitoring.repository

import com.example.iot_monitoring.model.SensorReading
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.time.LocalDateTime

@Repository
interface SensorReadingRepository : JpaRepository<SensorReading, Long> {
    fun findAllBySensorIdInAndTimestampBetween(
        sensorIds: List<String>,
        start: LocalDateTime,
        end: LocalDateTime
    ): List<SensorReading>
}