<script setup lang="ts">
import { useGameStore } from '~/stores/game'
const store = useGameStore()
</script>

<template>
  <div class="d-flex justify-content-center dice-container">
    <div
      v-for="(value, index) in store.dice"
      :key="index"
      class="dice"
      :class="{ rolling: store.rolling }"
      :data-value="value"
    ></div>
  </div>
</template>

<style scoped>
.dice-container {
  gap: 10px;
  background-color: var(--text-dark);
  padding: 15px;
  border-radius: 15px;
}
.dice {
  width: 50px;
  height: 50px;
  background-size: cover;
}
.dice[data-value="1"] { background-image: url('/dice/1.svg'); }
.dice[data-value="2"] { background-image: url('/dice/2.svg'); }
.dice[data-value="3"] { background-image: url('/dice/3.svg'); }
.dice[data-value="4"] { background-image: url('/dice/4.svg'); }
.dice[data-value="5"] { background-image: url('/dice/5.svg'); }
.dice[data-value="6"] { background-image: url('/dice/6.svg'); }

.rolling {
  animation: spin 0.5s linear infinite;
}
@keyframes spin {
  from { transform: rotateX(0deg) rotateY(0deg); }
  to { transform: rotateX(360deg) rotateY(360deg); }
}
</style>