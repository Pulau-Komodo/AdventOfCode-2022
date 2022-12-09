import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8")
	.replaceAll("\r", "")
	.split("\n").map(line => line.split(" "));

type Node = { x: number, y: number; };
const nodes = Array.from({ length: 10 }, (): Node => ({ x: 0, y: 0 }));

const isTouching = (node: Node, target: Node) => {
	for (const x of [-1, 0, 1]) {
		for (const y of [-1, 0, 1]) {
			if (target.x === node.x + x && target.y === node.y + y) {
				return true;
			}
		}
	}

	return false;
};

const updatePosition = (node: Node, target: Node) => {
	if (isTouching(node, target)) return;
	if (node.x === target.x || node.y === target.y) {
		if (node.x <= target.x - 2) node.x++;
		if (node.x >= target.x + 2) node.x--;
		if (node.y <= target.y - 2) node.y++;
		if (node.y >= target.y + 2) node.y--;
	} else {
		if (node.y < target.y) node.y++;
		else if (node.y > target.y) node.y--;
		if (node.x > target.x) node.x--;
		else if (node.x < target.x) node.x++;
	}
};

const secondNodePositions = new Set();
const endNodePositions = new Set();

for (const [dir, rawMovement] of input) {
	const movement = parseInt(rawMovement);
	for (let i = 0; i < movement; i++) {
		if (dir === 'R') nodes[0].x++;
		if (dir === 'L') nodes[0].x--;
		if (dir === 'U') nodes[0].y++;
		if (dir === 'D') nodes[0].y--;


		for (let i = 0; i < nodes.length - 1; i++) {
			updatePosition(nodes[i + 1], nodes[i]);
		}

		secondNodePositions.add(`${nodes[1].x},${nodes[1].y}`);
		endNodePositions.add(`${nodes[9].x},${nodes[9].y}`);
	}
}

console.log('Part 1:', secondNodePositions.size);
console.log('Part 2:', endNodePositions.size);