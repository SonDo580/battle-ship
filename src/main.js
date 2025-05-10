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

const shipTypesCount = Object.keys(SHIP_TYPE).length;

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

export function GameBoardFactory() {
  const positionToShipMap = {};
  const attackedPositionSet = new Set();
  let sunkShipsCount = 0;

  function placeShip(ship, topRow, leftCol, direction) {
    if (!_isValidCoords(topRow, leftCol)) {
      throw new Error(ERROR_MESSAGE.invalidShipPosition);
    }

    if (direction === SHIP_DIRECTION.horizontal) {
      _placeShipHorizontally(ship, topRow, leftCol);
    } else if (direction === SHIP_DIRECTION.vertical) {
      _placeShipVertically(ship, topRow, leftCol);
    }
  }

  function _placeShipHorizontally(ship, row, leftCol) {
    const rightCol = leftCol + ship.length - 1;
    if (!_isValidCoords(row, rightCol)) {
      throw new Error(ERROR_MESSAGE.invalidShipPosition);
    }

    // Check for overlap with other ships
    for (let col = leftCol; col <= rightCol; col++) {
      const positionKey = _getPositionKey(row, col);
      if (positionToShipMap[positionKey]) {
        throw new Error(ERROR_MESSAGE.invalidShipPosition);
      }
    }

    // Place the ship
    for (let col = leftCol; col <= rightCol; col++) {
      const positionKey = _getPositionKey(row, col);
      positionToShipMap[positionKey] = ship;
    }
  }

  function _placeShipVertically(ship, topRow, col) {
    const bottomRow = topRow + ship.length - 1;
    if (!_isValidCoords(bottomRow, col)) {
      throw new Error(ERROR_MESSAGE.invalidShipPosition);
    }

    // Check for overlap with other ships
    for (let row = topRow; row <= bottomRow; row++) {
      const positionKey = _getPositionKey(row, col);
      if (positionToShipMap[positionKey]) {
        throw new Error(ERROR_MESSAGE.invalidShipPosition);
      }
    }

    // Place the ship
    for (let row = topRow; row <= bottomRow; row++) {
      const positionKey = _getPositionKey(row, col);
      positionToShipMap[positionKey] = ship;
    }
  }

  function receiveAttack(row, col) {
    if (!_isValidCoords(row, col)) {
      throw new Error(ERROR_MESSAGE.invalidCoordinates);
    }
    const positionKey = _getPositionKey(row, col);

    // Check if attack the same position
    if (attackedPositionSet.has(positionKey)) {
      throw new Error(ERROR_MESSAGE.alreadyAttacked);
    }
    attackedPositionSet.add(positionKey);

    // Check if any ship is hit
    const attackedShip = positionToShipMap[positionKey];
    if (attackedShip) {
      attackedShip.getHit();

      if (attackedShip.isSunk()) {
        sunkShipsCount++;
      }
    }
  }

  function allShipsSunk() {
    return sunkShipsCount === shipTypesCount;
  }

  function _getPositionKey(row, col) {
    return `${row}-${col}`;
  }

  function _isValidCoords(row, col) {
    return row >= 0 && row < BOARD_SIZE && col >= 0 && col < BOARD_SIZE;
  }

  return {
    placeShip,
    receiveAttack,
    allShipsSunk,
  };
}
