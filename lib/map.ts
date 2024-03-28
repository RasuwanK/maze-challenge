export function getCords(block: number, width: number, height: number) {
  let row = 0;
  let col = 0;

  while (block > (row + 1) * width - 1) {
    ++row;
  }

  col = block - width * row;

  return [col, row];
}

export function generateEdgeTable(width: number, height: number) {
  let edgeTable = new Array(width * height);

  // Initializing the edge table
  for (let i = 0; i < width * height; ++i) {
    edgeTable[i] = new Array(width * height);
    for (let j = 0; j < width * height; ++j) {
      edgeTable[i][j] = false;
    }
  }

  // Generating possible moved using a maze generation algorithm
  const visited: number[] = [];
  const tracker: number[] = [];

  // Setting the visited stack
  visited.push(0);
  // Setting the tracker to 0
  tracker.push(0);

  while (tracker.length > 0) {
    const current = tracker.pop() as number;
    const moves: number[] = [];
    const [x, y] = getCords(current, width, height);

    if (y > 0) {
      const newCell = current - width;
      if (!visited.includes(newCell)) {
        moves.push(newCell);
      }
    }

    if (y < height - 1) {
      const newCell = current + width;
      if (!visited.includes(newCell)) {
        moves.push(newCell);
      }
    }

    if (x > 0) {
      const newCell = current - 1;
      if (!visited.includes(newCell)) {
        moves.push(newCell);
      }
    }

    if (x < width - 1) {
      const newCell = current + 1;
      if (!visited.includes(newCell)) {
        moves.push(newCell);
      }
    }

	if(moves.length > 0) {
		const cursor = Math.floor(Math.random() * moves.length);
		const selection = moves[cursor];
		// Mark as visited
		visited.push(selection);
		tracker.push(selection);

		edgeTable[current][selection] = true;
		edgeTable[selection][current] = true;
	}

  }

  return edgeTable;
}
