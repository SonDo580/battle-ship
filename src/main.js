export const ERROR_MESSAGE = {
  invalidShipType: "Invalid ship type",
};

export const SHIP_TYPE = {
  carrier: "carrier",
  battleShip: "battleShip",
  destroyer: "destroyer",
  submarine: "submarine",
  patrolBoat: "patrolBoat",
};

export const SHIP_LENGTH_MAP = {
  [SHIP_TYPE.carrier]: 5,
  [SHIP_TYPE.battleShip]: 4,
  [SHIP_TYPE.destroyer]: 3,
  [SHIP_TYPE.submarine]: 3,
  [SHIP_TYPE.patrolBoat]: 2,
};

export function ShipFactory(shipType) {
  if (!SHIP_LENGTH_MAP[shipType]) {
    throw new Error(ERROR_MESSAGE.invalidShipType);
  }

  const length = SHIP_LENGTH_MAP[shipType];
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
    length,
    getHit,
    isSunk,
  };
}
