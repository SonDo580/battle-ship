import { GameBoardFactory } from "./GameBoard";

export function PlayerFactory(playerType) {
  return {
    type: playerType,
    board: GameBoardFactory(),
  };
}
