import { ShogunNumberUtility } from "../shogun-number-utility";

describe("ShogunNumberUtility - getRandomIntegerNumber", () => {
  let util;
  beforeEach(() => {
    util = new ShogunNumberUtility();
  });

  test("returns integer within range [fromInclusive, toExclusive)", () => {
    for (let i = 0; i < 100; i++) {
      const result = util.getRandomIntegerNumber(1, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThan(10);
    }
  });

  test("returns fromInclusive if range is minimal (fromInclusive, fromInclusive + 1)", () => {
    const result = util.getRandomIntegerNumber(5, 6);
    expect(result).toBe(5);
  });

  test("throws RangeError if toExclusive <= fromInclusive", () => {
    expect(() => util.getRandomIntegerNumber(5, 5)).toThrow(RangeError);
    expect(() => util.getRandomIntegerNumber(10, 5)).toThrow(RangeError);
  });

  test("throws RangeError if arguments are negative", () => {
    expect(() => util.getRandomIntegerNumber(-1, 5)).toThrow(RangeError);
    expect(() => util.getRandomIntegerNumber(1, -5)).toThrow(RangeError);
    expect(() => util.getRandomIntegerNumber(-1, -5)).toThrow(RangeError);
  });

  test("throws TypeError if arguments are not numbers", () => {
    expect(() => util.getRandomIntegerNumber("a", 5)).toThrow(TypeError);
    expect(() => util.getRandomIntegerNumber(1, "b")).toThrow(TypeError);
    expect(() => util.getRandomIntegerNumber(null, undefined)).toThrow(TypeError);
  });

  test("throws TypeError if arguments are not integers", () => {
    expect(() => util.getRandomIntegerNumber(1.1, 5)).toThrow(TypeError);
    expect(() => util.getRandomIntegerNumber(1, 5.5)).toThrow(TypeError);
  });

  test("works with zero and positive ranges", () => {
    for (let i = 0; i < 100; i++) {
      const result = util.getRandomIntegerNumber(0, 10);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(10);
    }
  });

  test("works with large numbers", () => {
    for (let i = 0; i < 100; i++) {
      const result = util.getRandomIntegerNumber(0, 1000000);
      expect(Number.isInteger(result)).toBe(true);
      expect(result).toBeGreaterThanOrEqual(0);
      expect(result).toBeLessThan(1000000);
    }
  });

  test("returns different values over multiple calls (not always the same)", () => {
    const results = new Set();
    for (let i = 0; i < 50; i++) {
      results.add(util.getRandomIntegerNumber(0, 5));
    }
    // Because randomness is involved, expect at least 2 different values got
    expect(results.size).toBeGreaterThan(1);
  });
});
