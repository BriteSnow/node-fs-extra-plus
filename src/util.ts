

export function globCompare(a: string, b: string) {
	const aPathIdxs = pathIndexes(a);
	const bPathIdxs = pathIndexes(b);
	const minIdx = Math.min(aPathIdxs.length, bPathIdxs.length) - 1;
	const aMinPath = a.substring(0, aPathIdxs[minIdx]);
	const bMinPath = b.substring(0, bPathIdxs[minIdx]);

	// if the common path is the same, and the path depth is different, then, the shortest one come first;
	if ((aMinPath === bMinPath) && (aPathIdxs.length !== bPathIdxs.length)) {
		return (aPathIdxs.length < bPathIdxs.length) ? -1 : 1;
	}

	// otherwise, we do a normal compare
	return (a < b) ? -1 : 1;


}

function pathIndexes(fullPath: string): number[] {
	const idxs: number[] = [];

	const l = fullPath.length;
	for (let i = 0; i < l; i++) {
		if (fullPath[i] === '/') {
			idxs.push(i);
		}
	}

	return idxs;
}