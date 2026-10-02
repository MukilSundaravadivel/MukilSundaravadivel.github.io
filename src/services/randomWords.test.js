import assert from "node:assert/strict";
import { afterEach, mock, test } from "node:test";
import { fetchRandomWords } from "./randomWords.js";

afterEach(() => mock.restoreAll());

function respondWith(data, status = 200) {
  return mock.method(globalThis, "fetch", async () =>
    Response.json(data, { status }),
  );
}

test("requests easy words and returns two distinct, trimmed words", async () => {
  const fetchMock = respondWith([" Water ", "water", "House"]);
  assert.deepEqual(await fetchRandomWords(), ["Water", "House"]);

  const [url, options] = fetchMock.mock.calls[0].arguments;
  assert.equal(
    url,
    "https://random-word-api.herokuapp.com/word?number=3&diff=1",
  );
  assert.equal(options.cache, "no-store");
});

test("rejects unsuccessful HTTP responses", async () => {
  respondWith({ error: "Unavailable" }, 503);
  await assert.rejects(fetchRandomWords(), /503/);
});

test("rejects malformed payloads and non-string words", async () => {
  for (const data of [{ words: ["water", "house"] }, ["water", 42]]) {
    respondWith(data);
    await assert.rejects(fetchRandomWords(), /invalid response/);
  }
});

test("rejects empty words and duplicate-only responses", async () => {
  for (const data of [[], [" ", "water"], ["Water", "water"]]) {
    respondWith(data);
    await assert.rejects(fetchRandomWords(), /two different words/);
  }
});

test("rejects invalid JSON", async () => {
  mock.method(globalThis, "fetch", async () => new Response("not JSON"));
  await assert.rejects(fetchRandomWords(), SyntaxError);
});

test("propagates network failures", async () => {
  mock.method(globalThis, "fetch", async () => {
    throw new TypeError("Failed to fetch");
  });
  await assert.rejects(fetchRandomWords(), /Failed to fetch/);
});

test("forwards cancellation to the request", async () => {
  const controller = new AbortController();
  mock.method(globalThis, "fetch", async (_url, { signal }) => {
    controller.abort();
    signal.throwIfAborted();
  });
  await assert.rejects(fetchRandomWords({ signal: controller.signal }), {
    name: "AbortError",
  });
});

test("applies a ten-second timeout", async () => {
  mock.method(AbortSignal, "timeout", (duration) => {
    assert.equal(duration, 10000);
    return AbortSignal.abort(new DOMException("Timed out", "TimeoutError"));
  });
  mock.method(globalThis, "fetch", async (_url, { signal }) => {
    signal.throwIfAborted();
  });
  await assert.rejects(fetchRandomWords(), { name: "TimeoutError" });
});
