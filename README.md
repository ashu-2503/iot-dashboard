# 📊 IoT Dashboard – Sensor Data Visualization POC

This POC visualizes **amplitude and frequency sensor data over time** for one or more selected sensors. It features both **2D line charts** and **3D scatter plots** to provide comprehensive analysis of dummy-generated IoT data.

---

## 🚀 Features

- 📈 **2D Line Chart** – Built using **Chart.js**
- 🌐 **3D Scatter Chart** – Powered by **Apache ECharts (GL)**
- 🕓 Visualizes **frequency & amplitude over time**
- 📦 Toggle between **multiple sensors**
- 🔄 Backend generates **dummy sensor data**
- 🖥️ **Frontend:** React
- 🔧 **Backend:** Kotlin + Spring Boot

---

## 🛠️ Getting Started

### 🔹 Prerequisites
- Java 17+
- Node.js 18+
- Gradle (or use wrapper)
- Git with SSH access

---

### 🔸 Clone the Repo

```bash
git clone git@github.com:ashu-2503/iot-dashboard.git
cd iot-dashboard
git checkout dev

### Backend (Spring Boot)
```bash
cd backend
./gradlew bootRun

### Frontend (React)
cd frontend
npm install
npm run dev
