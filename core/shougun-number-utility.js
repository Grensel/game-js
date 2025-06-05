export class ShougunNumberUtility {
  getRandomInteger(fromInclusive, toExclusive) {
    if (typeof fromInclusive !== "number" || typeof toExclusive !== "number") {
      throw new TypeError("Arguments must be numbers");
    }
    if (!Number.isInteger(fromInclusive) || !Number.isInteger(toExclusive)) {
      throw new TypeError("Arguments must be integers");
    }
    if (fromInclusive < 0 || toExclusive < 0) {
      throw new RangeError("Arguments must be non-negative");
    }
    if (toExclusive <= fromInclusive) {
      throw new RangeError("toExclusive must be greater than fromInclusive");
    }
    return Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive;
  }
}
