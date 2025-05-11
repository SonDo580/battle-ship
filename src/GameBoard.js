import {
  BOARD_SIZE,
  ERROR_MESSAGE,
  MARKER,
  SHIP_DIRECTION,
  shipTypesCount,
} from "./constants";

export function GameBoardFactory() {
  const positionToShipMap = {};
  const attackedPositionSet = new Set();
  let sunkShipsCount = 0;

  const state = [];
  _initState();

  function _initState() {
    for (let row = 0; row < BOARD_SIZE; row++) {
      state[row] = [];
      for (let col = 0; col < BOARD_SIZE; col++) {
        state[row][col] = MARKER.empty;
      }
    }
  }

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
      state[row][col] = MARKER.ship;
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
      state[row][col] = MARKER.ship;
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
      state[row][col] = MARKER.shipHit;

      if (attackedShip.isSunk()) {
        sunkShipsCount++;
      }
    } else {
      state[row][col] = MARKER.miss;
    }
  }

  function allShipsSunk() {
    return sunkShipsCount === shipTypesCount;
  }

  function getState() {
    return state;
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
    getState,
  };
}
