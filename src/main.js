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
  const length = SHIP_LENGTH_MAP[shipType];
  let hitCount = 0;
  let sunk = false;

  function getHit() {
    if (hitCount == length) {
      return;
    }

    hitCount++;
    if (hitCount == length) {
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
