<template>
  <div class="d-flex justify-content-center align-items-center gap-5 h-100vh">
    <!-- Main card -->
    <div class="card-container">
      <DiceRoll />
      <div class="d-flex mt-3 gap-1 justify-content-between">
        <!-- Prices -->
        <div class="sub-card w-100">
          <h4 class="m-0 mb-1 text-center">Prices</h4>
          <div class="d-flex justify-content-between gap-1 prices-container lh-28"
            :class="{ 'prices-container--active': store.lastCombination === 2 }">
            <span>Pair</span>
            <b>x2</b>
          </div>
          <div class="d-flex justify-content-between gap-1 prices-container lh-28"
            :class="{ 'prices-container--active': store.lastCombination === 3 }">
            <span>Full house</span>
            <b>x3</b>
          </div>
          <div class="d-flex justify-content-between gap-1 prices-container lh-28"
            :class="{ 'prices-container--active': store.lastCombination === 4 }">
            <span>Balut</span>
            <b>x4</b>
          </div>
          <div class="d-flex justify-content-between gap-1 prices-container lh-28"
            :class="{ 'prices-container--active': store.lastCombination === 5 }">
            <span>Straight</span>
            <b>x5</b>
          </div>
          <div class="d-flex justify-content-between gap-1 prices-container lh-28"
            :class="{ 'prices-container--active': store.lastCombination === 0 && store.history.length }">
            <span>Other</span>
            <b>x0</b>
          </div>
        </div>
        <div class="w-100">
          <!-- Bet -->
          <div class="sub-card">
            <h4 class="m-0 mb-1 text-center">Bet</h4>
            <div class="d-flex gap-1 align-items-center">
              <input
                class="bet-input"
                type="number"
                v-model.number="bet"
                min="1"
              />
              <button class="btn btn-primary" @click="onRoll">ROLL</button>
            </div>
          </div>
          <!-- Balance -->
          <div class="sub-card mt-2">
            <h4 class="m-0 mb-1 text-center">Your balance</h4>
            <p class="m-0 text-center">{{ store.balance }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Details -->
    <div>
      <div class="d-flex gap-1 mb-1">
        <NuxtLink
          class="btn btn-outline"
          active-class="btn-primary"
          exact-active-class="is-exact-active"
          to="/game/chart"
          >Chart</NuxtLink
        >
        <NuxtLink
          class="btn btn-outline"
          active-class="btn-primary"
          exact-active-class="is-exact-active"
          to="/game/result"
          >Result</NuxtLink
        >
      </div>
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useGameStore } from "~/stores/game";
const store = useGameStore();

const bet = ref(10);
function onRoll() {
  store.rollDice(bet.value);
}
</script>

<style>
.bet-input {
  background-color: transparent;
  max-width: 100%;
  border: none;
  border-radius: 25px;
  border: 1px solid var(--border);
  background-color: var(--card);
  font-weight: 400;
  font-size: 20px;
  line-height: 22px;
  padding: 10px;
  color: var(--primary);
  width: 80px;
}
.bet-input:focus-visible {
  outline: none;
}
.prices-container--active {
  color: var(--primary);
}
</style>
