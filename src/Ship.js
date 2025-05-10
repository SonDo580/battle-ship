import { SHIP_LENGTH_MAP } from "./constants";

export function ShipFactory(shipType) {
  const length = SHIP_LENGTH_MAP[shipType];
  let hitCount = 0;
  let sunk = false;

  function getHit() {
    if (hitCount === length) {
      return;
    }

    hitCount++;
    if (hitCount === length) {
      sunk = true;
    }
  }

  function isSunk() {
    return sunk;
  }

  return {
    length,
    getHit,
    isSunk,
  };
}
