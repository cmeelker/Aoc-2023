import { Day } from "../day";
import { sum } from "../utils/utils";

function getNumbers(line: string): string {
  return line.replace(/[^0-9]/g, "");
}

class Day1 extends Day {
  constructor() {
    super(1);
  }

  getNthNumber(input: string, n: number): number {
    return Number(String(input).charAt(n));
  }

  getLineValue(input: string): number {
    const first = String(this.getNthNumber(input, 0));
    const last = String(this.getNthNumber(input, input.length - 1));

    return Number(first + last);
  }

  getNumberWithText(line: string): string {
    const values: { [key: string]: string } = {
      one: "1",
      "1": "1",
      two: "2",
      "2": "2",
      three: "3",
      "3": "3",
      four: "4",
      "4": "4",
      five: "5",
      "5": "5",
      six: "6",
      "6": "6",
      seven: "7",
      "7": "7",
      eight: "8",
      "8": "8",
      nine: "9",
      "9": "9",
    };

    let result = "";

    for (let i = 0; i < line.length; i++) {
      const part = line.slice(i, line.length);

      Object.keys(values).forEach((key) => {
        if (part.startsWith(key)) {
          result += values[key];
        }
      });
    }

    return getNumbers(result);
  }

  solveForPartOne(input: string): string {
    const lines = input.split("\n");
    const numbers = lines.map(getNumbers);

    const lineValues = numbers.map((n) => this.getLineValue(n));

    return String(sum(lineValues));
    //53974
  }

  solveForPartTwo(input: string): string {
    const lines = input.split("\n");
    const numbers = lines.map(this.getNumberWithText);
    const lineValues = numbers.map((n) => this.getLineValue(n));

    return String(sum(lineValues));
    //52840
  }
}

export default new Day1();
