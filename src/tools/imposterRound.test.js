import assert from "node:assert/strict";
import test from "node:test";
import {
  createImposterRound,
  getMaximumImposters,
  MAX_PLAYERS,
} from "./imposterRound.js";

test("dealing assigns exactly the requested number of imposters at every supported group size", () => {
  for (let playerCount = 1; playerCount <= MAX_PLAYERS; playerCount += 1) {
    for (
      let imposterCount = 1;
      imposterCount <= getMaximumImposters(playerCount);
      imposterCount += 1
    ) {
      const round = createImposterRound({
        playerCount,
        imposterCount,
        playerNames: Array(MAX_PLAYERS).fill(""),
        groupWord: "Coffee",
        imposterWord: "Tea",
      });

      assert.equal(round.cards.length, playerCount);
      const imposters = round.cards.filter((card) => card.word === "Tea");
      assert.equal(imposters.length, imposterCount);
      assert.deepEqual(
        round.imposterNames,
        imposters.map((card) => card.name),
      );
      assert.equal(new Set(round.imposterNames).size, imposterCount);
      assert.equal(
        round.cards.filter((card) => card.word === "Coffee").length,
        playerCount - imposterCount,
      );
      assert.ok(round.cards.some((card) => card.name === round.startingPlayer));
      assert.equal(round.cards.at(-1).name, `Player ${playerCount}`);
    }
  }
});

test("duplicate names do not change the number of imposters", () => {
  const round = createImposterRound({
    playerCount: 20,
    imposterCount: 5,
    playerNames: Array(20).fill(" Sam "),
    groupWord: "Coffee",
    imposterWord: "Tea",
  });
  assert.equal(round.cards.filter((card) => card.word === "Tea").length, 5);
  assert.deepEqual(round.imposterNames, Array(5).fill("Sam"));
});

test("invalid counts are rejected", () => {
  const options = {
    playerCount: 4,
    imposterCount: 1,
    playerNames: Array(20).fill(""),
    groupWord: "Coffee",
    imposterWord: "Tea",
  };
  for (const playerCount of [0, 21, 2.5]) {
    assert.throws(() => createImposterRound({ ...options, playerCount }));
  }
  for (const imposterCount of [0, 4, 1.5]) {
    assert.throws(() => createImposterRound({ ...options, imposterCount }));
  }
});
