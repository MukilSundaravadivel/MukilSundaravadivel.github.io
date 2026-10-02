import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { selectRandomGenshinCharacters } from "./genshinCharacters.js";

afterEach(() => mock.restoreAll());

test("ignores blank lines and case-insensitive duplicate names", () => {
  mock.method(Math, "random", () => 0);
  const characterList = "\r\n Amber \r\namber\r\n Kaeya \r\n";
  assert.deepEqual(selectRandomGenshinCharacters(characterList), [
    "Amber",
    "Kaeya",
  ]);
});

test("can select every ordered pair without selecting the same character twice", () => {
  const names = ["Amber", "Kaeya", "Lisa"];
  const characterList = names.join("\n");

  for (let groupIndex = 0; groupIndex < names.length; groupIndex += 1) {
    const remainingNames = names.filter((_, index) => index !== groupIndex);
    for (
      let imposterIndex = 0;
      imposterIndex < remainingNames.length;
      imposterIndex += 1
    ) {
      const randomValues = [
        (groupIndex + 0.5) / names.length,
        (imposterIndex + 0.5) / remainingNames.length,
      ];
      mock.method(Math, "random", () => randomValues.shift());
      assert.deepEqual(selectRandomGenshinCharacters(characterList), [
        names[groupIndex],
        remainingNames[imposterIndex],
      ]);
      mock.restoreAll();
    }
  }
});

test("requires at least two distinct character names", () => {
  for (const characterList of ["", " \n", "Amber", "Amber\namber"]) {
    assert.throws(
      () => selectRandomGenshinCharacters(characterList),
      /at least two different names/,
    );
  }
});
