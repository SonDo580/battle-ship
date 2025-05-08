export const ERROR_MESSAGE = {
  INVALID_SHIP_LENGTH: "Invalid ship length",
};

const SHIP_LENGTH_MAP = {
  carrier: 5,
  battleShip: 4,
  destroyer: 3,
  submarine: 3,
  patrolBoat: 2,
};

const validShipLengthSet = new Set(Object.values(SHIP_LENGTH_MAP));

export function ShipFactory(length) {
  if (!validShipLengthSet.has(length)) {
    throw new Error(ERROR_MESSAGE.INVALID_SHIP_LENGTH);
  }

  let hit_count = 0;
  let sunk = false;

  function getHit() {
    if (hit_count == length) {
      return;
    }

    hit_count++;
    if (hit_count == length) {
      sunk = true;
    }
  }

  function isSunk() {
    return sunk;
  }

  return {
    getHit,
    isSunk,
  };
}
