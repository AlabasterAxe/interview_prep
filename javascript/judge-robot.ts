interface Location {
  x: number;
  y: number;
}

export function judgeCircle(moves: string): boolean {
  let loc: Location = { x: 0, y: 0 };

  for (const move of moves) {
    switch (move) {
      case "U":
        loc = { x: loc.x, y: loc.y + 1 };
        break;
      case "R":
        loc = { x: loc.x + 1, y: loc.y };
        break;
      case "L":
        loc = { x: loc.x - 1, y: loc.y };
        break;
      case "D":
        loc = { x: loc.x, y: loc.y - 1 };
        break;
    }
  }
  return loc.x === 0 && loc.y === 0;
}
