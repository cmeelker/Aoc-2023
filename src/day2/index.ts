import { Day } from "../day";
import { sum } from "../utils/utils";

const bag: { [key in Color]: number } = {
  red: 12,
  green: 13,
  blue: 14,
};

const maxValue: { [key in Color]: number } = {
  red: 0,
  green: 0,
  blue: 0,
};

type Color = "red" | "green" | "blue";

class ColorCount {
  color: Color;
  count: number;

  constructor(input: string) {
    this.color = input.split(" ")[2] as Color;
    this.count = Number(input.split(" ")[1]);
  }

  isValid(): boolean {
    return bag[this.color] >= this.count;
  }
}

class CubeSet {
  colorCounts: ColorCount[];
  maxBlue = 0;
  maxGreen = 0;
  maxRed = 0;

  constructor(input: string) {
    this.colorCounts = input.split(";").map((color) => new ColorCount(color));
  }

  isValid() {
    return !this.colorCounts.map((color) => color.isValid()).includes(false);
  }

  setMaxValues() {
    this.colorCounts.forEach((colorCount) => {
      if (colorCount.color === "blue" && colorCount.count > this.maxBlue) {
        this.maxBlue = colorCount.count;
      }
      if (colorCount.color === "red" && colorCount.count > this.maxRed) {
        this.maxRed = colorCount.count;
      }
      if (colorCount.color === "green" && colorCount.count > this.maxGreen) {
        this.maxGreen = colorCount.count;
      }
    });
  }
}

class Game {
  id: number;
  cubeSets: CubeSet[];
  maxBlue = 0;
  maxGreen = 0;
  maxRed = 0;

  constructor(input: string) {
    this.id = Number(input.split(":")[0].split(" ")[1]);
    this.cubeSets = input
      .split(":")[1]
      .split(",")
      .map((set) => new CubeSet(set));
  }

  isValid() {
    return !this.cubeSets.map((cubeSet) => cubeSet.isValid()).includes(false);
  }

  lowestPower() {
    this.cubeSets.map((set) => {
      if (set.maxBlue > this.maxBlue) {
        this.maxBlue = set.maxBlue;
      }
      if (set.maxGreen > this.maxGreen) {
        this.maxGreen = set.maxGreen;
      }
      if (set.maxRed > this.maxRed) {
        this.maxRed = set.maxRed;
      }
    });

    return this.maxBlue * this.maxGreen * this.maxRed;
  }
}

class Day2 extends Day {
  constructor() {
    super(2);
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const games = lines.map((game) => new Game(game));
    const validGameIds = games.map((game) => {
      if (game.isValid()) {
        return game.id;
      } else {
        return 0;
      }
    });
    const validGameIdsFiltered = validGameIds.filter((id) => id != 0);

    return String(sum(validGameIdsFiltered));
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const games = lines.map((game) => new Game(game));
    const gamePowers = games.map((game) => {
      game.cubeSets.forEach((set) => set.setMaxValues());
      return game.lowestPower();
    });

    return String(sum(gamePowers));
  }
}

export default new Day2();
