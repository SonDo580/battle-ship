import { BOARD_SIZE, MARKER, SHIP_DIRECTION, SHIP_TYPE } from "./constants";
import { GameBoardFactory } from "./GameBoard";
import { ShipFactory } from "./Ship";

describe("GameBoardFactory", () => {
  it("should throw if ships are placed at invalid coordinates", () => {
    const gameBoard = GameBoardFactory();
    const carrier = ShipFactory(SHIP_TYPE.carrier);

    expect(() =>
      gameBoard.placeShip(carrier, 0, -1, SHIP_DIRECTION.horizontal)
    ).toThrow();

    expect(() =>
      gameBoard.placeShip(
        carrier,
        0,
        BOARD_SIZE + 1 - carrier.length,
        SHIP_DIRECTION.horizontal
      )
    ).toThrow();
  });

  it("should throw if ships are overlap with each other", () => {
    const gameBoard = GameBoardFactory();
    const carrier = ShipFactory(SHIP_TYPE.carrier);
    const battleShip = ShipFactory(SHIP_TYPE.battleShip);

    const carrierRow = 0;
    const carrierStartCol = 0;
    const carrierEndCol = carrierStartCol + carrier.length - 1;
    gameBoard.placeShip(
      carrier,
      carrierRow,
      carrierStartCol,
      SHIP_DIRECTION.horizontal
    );

    expect(() =>
      gameBoard.placeShip(
        battleShip,
        carrierRow,
        carrierEndCol,
        SHIP_DIRECTION.vertical
      )
    ).toThrow();
  });

  it("should place all ships at valid positions successfully", () => {
    const gameBoard = GameBoardFactory();

    let row = 0;
    let startColumn = 0;
    for (const shipType of Object.values(SHIP_TYPE)) {
      const ship = ShipFactory(shipType);
      gameBoard.placeShip(ship, row, startColumn, SHIP_DIRECTION.horizontal);
      row++;
    }
  });

  it("should throw if receive attacks at the same position", () => {
    const gameBoard = GameBoardFactory();

    let row = 0;
    let startColumn = 0;
    for (const shipType of Object.values(SHIP_TYPE)) {
      const ship = ShipFactory(shipType);
      gameBoard.placeShip(ship, row, startColumn, SHIP_DIRECTION.horizontal);
      row++;
    }

    const attackedRow = 0;
    const attackedCol = 0;
    gameBoard.receiveAttack(attackedRow, attackedCol);
    expect(() => gameBoard.receiveAttack(attackedRow, attackedCol)).toThrow();
  });

  it("should report if all ships have been sunk correctly", () => {
    const gameBoard = GameBoardFactory();

    let startRow = 0;
    let startColumn = 0;
    const placedShips = [];

    let row = startRow;
    for (const shipType of Object.values(SHIP_TYPE)) {
      const ship = ShipFactory(shipType);
      placedShips.push(ship);
      gameBoard.placeShip(ship, row, startColumn, SHIP_DIRECTION.horizontal);
      row++;
    }

    expect(gameBoard.allShipsSunk()).toBe(false);

    // Attack all but leave out 1 ship
    let finalRow = row - 1;
    for (let row = startRow; row < finalRow; row++) {
      const ship = placedShips[row];
      for (let col = startColumn; col < ship.length; col++) {
        gameBoard.receiveAttack(row, col);
      }
    }

    expect(gameBoard.allShipsSunk()).toBe(false);

    // Attack the final ship
    const finalShip = placedShips[finalRow];
    for (let col = startColumn; col < finalShip.length; col++) {
      gameBoard.receiveAttack(finalRow, col);
    }

    expect(gameBoard.allShipsSunk()).toBe(true);
  });

  it("should update board state correctly", () => {
    const gameBoard = GameBoardFactory();

    // All positions are empty initially
    let currentState = gameBoard.getState();
    expect(currentState.length).toBe(BOARD_SIZE);
    for (let row = 0; row < BOARD_SIZE; row++) {
      expect(currentState[row].length).toBe(BOARD_SIZE);
      for (let col = 0; col < BOARD_SIZE; col++) {
        expect(currentState[row][col]).toBe(MARKER.empty);
      }
    }

    const placedRow = 0;
    const startCol = 0;
    const ship = ShipFactory(SHIP_TYPE.battleShip);
    const endCol = startCol + ship.length - 1;
    gameBoard.placeShip(ship, placedRow, startCol, SHIP_DIRECTION.horizontal);

    // Some positions are occupied by the ship
    currentState = gameBoard.getState();
    for (let col = startCol; col <= endCol; col++) {
      expect(currentState[placedRow][col]).toBe(MARKER.ship);
    }
    for (let col = endCol + 1; col < BOARD_SIZE; col++) {
      expect(currentState[placedRow][col]).toBe(MARKER.empty);
    }

    // Attack all positions on placedRow
    for (let col = startCol; col < BOARD_SIZE; col++) {
      gameBoard.receiveAttack(placedRow, col);
    }

    // Some attacks hit the ship while the others are missed
    currentState = gameBoard.getState();
    for (let col = startCol; col <= endCol; col++) {
      expect(currentState[placedRow][col]).toBe(MARKER.shipHit);
    }
    for (let col = endCol + 1; col < BOARD_SIZE; col++) {
      expect(currentState[placedRow][col]).toBe(MARKER.miss);
    }
  });
});
