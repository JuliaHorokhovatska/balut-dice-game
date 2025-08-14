import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    balance: 100,
    dice: [1, 1, 1, 1, 1],
    rolling: false,
    history: [] as {
      experiment: number;
      balance: number;
      bet: number;
      win: number;
    }[],
    rollCount: 0,
    lastCombination: -1,
  }),
  getters: {
    ALL_USER_WINS(state) {
      return state.history.reduce((sum, h) => sum + (h.win || 0), 0);
    },
    ALL_USER_BETS(state) {
      return state.history.reduce((sum, h) => sum + (h.bet || 0), 0);
    },
    RTP(state): number {
      const bets = Number(this.ALL_USER_BETS) || 0;
      const wins = Number(this.ALL_USER_WINS) || 0;

      if (bets <= 0) return 0;

      return (wins / bets) * 100;
    },
  },
  actions: {
    rollDice(bet: number) {
      if (bet <= 0 || bet > this.balance) return;

      this.rolling = true;
      this.balance -= bet;
      this.rollCount++;
      this.lastCombination = -1;

      setTimeout(() => {
        // Roll dice
        this.dice = Array.from(
          { length: 5 },
          () => Math.floor(Math.random() * 6) + 1
        );

        // Calculate winnings
        const multiplier = this.getMultiplier(this.dice);
        const winnings = bet * multiplier;
        this.balance += winnings;

        // Save to history
        this.history.push({
          experiment: this.rollCount,
          balance: this.balance,
          bet: bet,
          win: winnings,
        });

        this.rolling = false;
        this.lastCombination = multiplier;
      }, 1000);
    },

    // Detect combination → return multiplier
    getMultiplier(dice: number[]): number {
      const counts: Record<number, number> = {};
      dice.forEach((d) => (counts[d] = (counts[d] || 0) + 1));
      const values = Object.values(counts).sort((a, b) => b - a);

      const sorted = [...dice].sort((a, b) => a - b);
      const isStraight = sorted.every(
        (v, i, arr) => i === 0 || v === (arr[i - 1] || 0) + 1
      );

      console.log('counts', counts, 'values', values, 'isStraight', isStraight);

      if (values.includes(5)) return 4; // Balut (5 of a kind)
      if (isStraight) return 5; // Straight
      if (values.includes(3) && values.includes(2)) return 3; // Full house
      if (values.includes(2) || values.includes(3) || values.includes(4))
        return 2; // Pair
      return 0; // Other
    },
  },
});
