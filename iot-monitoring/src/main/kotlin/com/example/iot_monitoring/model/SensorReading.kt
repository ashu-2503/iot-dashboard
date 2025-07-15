package com.example.iot_monitoring.model

import jakarta.persistence.Entity
import jakarta.persistence.Table
import jakarta.persistence.Id
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import java.time.LocalDateTime

@Entity
@Table(name = "sensor_readings")
data class SensorReading (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long = 0,
    var sensorId: String,
    var timestamp: LocalDateTime,
    var amplitude: Double,
    var frequency: Double
)