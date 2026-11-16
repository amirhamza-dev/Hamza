/**
 * Deterministic pseudo-random helper.
 *
 * The decorative layers (hearts, petals, sparkles, butterflies...) need
 * random-looking values that are identical on the server and on the client,
 * otherwise React would report a hydration mismatch. A tiny seeded generator
 * solves this without pulling in an extra dependency.
 */
export function createRandom(seed = 20260214) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;

  return function random() {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

/** Random float between `min` and `max`. */
export function range(random, min, max) {
  return min + random() * (max - min);
}

/** Random integer between `min` and `max` (inclusive). */
export function intRange(random, min, max) {
  return Math.round(range(random, min, max));
}
