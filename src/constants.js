export const ERROR_MESSAGE = {
  invalidCoordinates: "Invalid coordinates",
  invalidShipPosition: "Invalid ship position",
  alreadyAttacked: "Position already attacked",
};

export const SHIP_TYPE = {
  carrier: "carrier",
  battleShip: "battleShip",
  destroyer: "destroyer",
  submarine: "submarine",
  patrolBoat: "patrolBoat",
};

export const shipTypesCount = Object.keys(SHIP_TYPE).length;

export const SHIP_LENGTH_MAP = {
  [SHIP_TYPE.carrier]: 5,
  [SHIP_TYPE.battleShip]: 4,
  [SHIP_TYPE.destroyer]: 3,
  [SHIP_TYPE.submarine]: 3,
  [SHIP_TYPE.patrolBoat]: 2,
};

export const SHIP_DIRECTION = {
  horizontal: "horizontal",
  vertical: "vertical",
};

export const BOARD_SIZE = 10;

export const PLAYER_TYPE = {
  player: "player",
  computer: "computer",
};
