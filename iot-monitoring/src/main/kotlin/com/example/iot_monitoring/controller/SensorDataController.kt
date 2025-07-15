package com.example.iot_monitoring.controller

import com.example.iot_monitoring.model.SensorReading
import com.example.iot_monitoring.service.SensorDataService
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime

    @RestController
@RequestMapping("/api/sensor-readings")
class SensorDataController(
    private val sensorDataService: SensorDataService
) {

    @GetMapping
    fun getSensorReadings(
        @RequestParam sensorIds: String, // ✅ Accept comma-separated values
        @RequestParam start: LocalDateTime,
        @RequestParam end: LocalDateTime
    ): List<SensorReading> {
        val ids = sensorIds.split(",").map { it.trim() } // ✅ Convert to List<String>
        return sensorDataService.getSensorReadings(ids, start, end)
    }
}

