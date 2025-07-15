package com.example.iot_monitoring.config

import com.example.iot_monitoring.model.SensorReading
import com.example.iot_monitoring.repository.SensorReadingRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import java.time.LocalDateTime
import kotlin.random.Random

@Configuration
class DataLoader {

    @Bean
    fun loadData(sensorReadingRepository: SensorReadingRepository) = CommandLineRunner {
        val sensors = listOf("SEN-001", "SEN-002", "SEN-003")
        val now = LocalDateTime.now()
        val totalDays = 180

        sensors.forEach { sensorId ->
            for (dayOffset in 0 until totalDays) {
                val timestamp = now.minusDays(dayOffset.toLong()).withHour(10).withMinute(0)
                // ⬇️ Force both values into closer overlapping zones
                val commonValue = Random.nextDouble(20.0, 70.0) // central overlap zone

                val amplitude = if (Random.nextDouble() > 0.92) 75.0 else commonValue + Random.nextDouble(-5.0, 5.0)
                val frequency = if (Random.nextDouble() > 0.92) 75.0 else commonValue + Random.nextDouble(-5.0, 5.0)


                sensorReadingRepository.save(
                    SensorReading(
                        sensorId = sensorId,
                        timestamp = timestamp,
                        amplitude = amplitude,
                        frequency = frequency
                    )
                )
            }
        }
        println("✅ Dummy sensor data loaded.")
    }
}