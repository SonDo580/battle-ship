import { ERROR_MESSAGE, ShipFactory } from "./main";

describe("ShipFactory", () => {
  it("should throw error for invalid ship length", () => {
    expect(() => ShipFactory(1)).toThrow(ERROR_MESSAGE.INVALID_SHIP_LENGTH);
    expect(() => ShipFactory(6)).toThrow(ERROR_MESSAGE.INVALID_SHIP_LENGTH);
    expect(() => ShipFactory(0.5)).toThrow(ERROR_MESSAGE.INVALID_SHIP_LENGTH);
  });

  it("ship should be sunk when fully hit", () => {
    const length = 3;
    const ship = ShipFactory(length);

    // not sunk before fully hit
    for (let i = 0; i < length - 1; i++) {
      ship.getHit();
      expect(ship.isSunk()).toBe(false);
    }

    // sunk when fully hit
    ship.getHit();
    expect(ship.isSunk()).toBe(true);

    // remain sunk after fully hit
    ship.getHit();
    expect(ship.isSunk()).toBe(true);
  });
});
