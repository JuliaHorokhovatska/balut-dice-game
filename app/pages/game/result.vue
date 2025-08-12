<template>
  <div class="detail-container card-container">
    <h4 class="m-0 mb-1 text-center">Game Results</h4>
    <div class="sub-card w-100 mt-2">
      <div class="d-flex justify-content-between gap-1 lh-28">
        <span>All User Wins</span>
        <b>{{ ALL_USER_WINS }}</b>
      </div>
      <div class="d-flex justify-content-between gap-1 lh-28">
        <span>All User Bets</span>
        <b>{{ ALL_USER_BETS }}</b>
      </div>
      <div class="d-flex justify-content-between gap-1 lh-28 text-primary">
        <span>RTP</span>
        <b>{{ RTP.toFixed(2) }}%</b>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useGameStore } from "@/stores/game";

const gameStore = useGameStore();
const { ALL_USER_WINS, ALL_USER_BETS, RTP } = storeToRefs(gameStore);
</script>

<style scoped>
.results {
  background: var(--color-bg-light);
  padding: 20px;
  border-radius: 10px;
  color: var(--color-text-primary);
}
</style>
