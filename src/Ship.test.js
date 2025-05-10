import { SHIP_LENGTH_MAP, SHIP_TYPE } from "./constants";
import { ShipFactory } from "./Ship";

describe("ShipFactory", () => {
  it("should create a ship with correct length", () => {
    const shipType = SHIP_TYPE.battleShip;
    const ship = ShipFactory(shipType);
    expect(ship.length).toBe(SHIP_LENGTH_MAP[shipType]);
  });

  it("ship should be sunk when fully hit", () => {
    const shipType = SHIP_TYPE.carrier;
    const ship = ShipFactory(shipType);

    // not sunk before fully hit
    for (let i = 0; i < ship.length - 1; i++) {
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
