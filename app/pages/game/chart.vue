<template>
  <div class="detail-container card-container">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { storeToRefs } from 'pinia'
import { useGameStore } from '@/stores/game'

// Register Chart.js components
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, LinearScale, CategoryScale)

const gameStore = useGameStore()
const { history } = storeToRefs(gameStore)

// Reactive chart data from store.history
const chartData = computed(() => ({
  labels: history.value.map(h => h.experiment), // X-axis = experiment number
  datasets: [
    {
      label: 'Balance',
      data: history.value.map(h => h.balance),   // Y-axis = balance
      borderColor: '#4DD0E1',
      backgroundColor: 'rgba(77, 208, 225, 0.3)',
      fill: true,
      tension: 0.3
    }
  ]
}))

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { title: { display: true, text: 'Experiment' } },
    y: { title: { display: true, text: 'Balance' } }
  }
}
</script>

