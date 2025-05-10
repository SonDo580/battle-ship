import { PLAYER_TYPE } from "./constants";
import { PlayerFactory } from "./Player";

describe("PlayerFactory", () => {
  it("should create players with correct type", () => {
    const player = PlayerFactory(PLAYER_TYPE.player);
    const computer = PlayerFactory(PLAYER_TYPE.computer);
    expect(player.type).toBe(PLAYER_TYPE.player);
    expect(computer.type).toBe(PLAYER_TYPE.computer);
  });
});
