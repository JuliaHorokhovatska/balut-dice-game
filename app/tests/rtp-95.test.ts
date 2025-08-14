import { describe, it, expect } from "vitest";

function getMultiplier(dice: number[]): number {
  const counts: Record<number, number> = {};
  dice.forEach((d) => (counts[d] = (counts[d] || 0) + 1));
  const values = Object.values(counts).sort((a, b) => b - a);

  const sorted = [...dice].sort((a, b) => a - b);
  const isStraight = sorted.every(
    (v, i, arr) => i === 0 || v === (arr[i - 1] || 0) + 1
  );

  if (values.includes(5)) return 4; // Balut (5 of a kind)
  if (isStraight) return 5; // Straight
  if (values.includes(3) && values.includes(2)) return 3; // Full house
  if (values.includes(2) || values.includes(3) || values.includes(4)) return 2; // Pair
  return 0; // Other
}

describe("RTP Simulation", () => {
  it("Simulates many rounds to estimate RTP", () => {
    const BET_AMOUNT = 1;
    const ROUNDS = 1_000_000;

    let totalBets = 0;
    let totalWins = 0;

    let totalBets95 = 0;
    let totalWins95 = 0;

    for (let i = 0; i < ROUNDS; i++) {
      const dice = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * 6) + 1
      );
      const multiplier = getMultiplier(dice);
      const win = BET_AMOUNT * multiplier;

      totalBets += BET_AMOUNT;
      totalWins += win;
    }

    const RTP = (totalWins / totalBets) * 100;
    console.log(`Simulated ${ROUNDS} rounds`);
    console.log(`RTP: ${RTP.toFixed(2)}%`);
    const rtpCoif = 95 / RTP;
    console.log(`RTP Coif: ${rtpCoif}`);

    // Simulate 95% RTP
    for (let i = 0; i < ROUNDS; i++) {
      const dice = Array.from(
        { length: 5 },
        () => Math.floor(Math.random() * 6) + 1
      );
      const multiplier = getMultiplier(dice) * rtpCoif;
      const win = BET_AMOUNT * multiplier;

      totalBets95 += BET_AMOUNT;
      totalWins95 += win;
    }

    const RTP95 = (totalWins95 / totalBets95) * 100;
    console.log(`Simulated ${ROUNDS} rounds`);
    console.log(`RTP95: ${RTP95.toFixed(2)}%`);
    console.log(`New coif: 5 => ${5 * rtpCoif}, 4 => ${4 * rtpCoif}, 3 => ${3 * rtpCoif}, 2 => ${2 * rtpCoif}`);
   
    expect(RTP).toBeGreaterThan(0); // just to ensure test runs
  });
});
