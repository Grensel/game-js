import { ShougunNumberUtility } from "../shougun-number-utility";

describe("ShougunNumberUtility - getRandomInteger", () => {
  let util;
  beforeEach(() => {
    util = new ShougunNumberUtility();
  });

  test("returns integer within range [fromInclusive, toExclusive)", () => {
    for (let i = 0; i < 100; i++) {
      const result = util.getRandomInteger(1, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    }
  });

  test("returns fromInclusive if range is minimal (fromInclusive, fromInclusive + 1)", () => {
    const result = util.getRandomInteger(5, 6);
    expect(result).toBe(5);
  });

  test("throws RangeError if toExclusive <= fromInclusive", () => {
    expect(() => util.getRandomInteger(5, 5)).toThrow(RangeError);
    expect(() => util.getRandomInteger(10, 5)).toThrow(RangeError);
  });

  test("throws RangeError if arguments are negative", () => {
    expect(() => util.getRandomInteger(-1, 5)).toThrow(RangeError);
    expect(() => util.getRandomInteger(1, -5)).toThrow(RangeError);
    expect(() => util.getRandomInteger(-1, -5)).toThrow(RangeError);
  });

  test("throws TypeError if arguments are not numbers", () => {
    expect(() => util.getRandomInteger("a", 5)).toThrow(TypeError);
    expect(() => util.getRandomInteger(1, "b")).toThrow(TypeError);
    expect(() => util.getRandomInteger(null, undefined)).toThrow(TypeError);
  });

  test("throws TypeError if arguments are not integers", () => {
    expect(() => util.getRandomInteger(1.1, 5)).toThrow(TypeError);
    expect(() => util.getRandomInteger(1, 5.5)).toThrow(TypeError);
  });

  test("works with zero and positive ranges", () => {
    for (let i = 0; i < 100; i++) {
      const result = util.getRandomInteger(0, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  test("works with large numbers", () => {
    for (let i = 0; i < 100; i++) {
      const result = util.getRandomInteger(0, 1000000);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1000000);
    }
  });

  test("returns different values over multiple calls (not always the same)", () => {
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      results.add(util.getRandomInteger(0, 5));
    }
    // Because randomness is involved, expect at least 2 different values got
    expect(results.size).toBeGreaterThan(1);
  });
});
