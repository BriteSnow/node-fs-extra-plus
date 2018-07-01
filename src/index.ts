export * from 'fs-extra';
import { join as pathJoin } from 'path';
import { pathExists, remove } from 'fs-extra';
import { async as _fastGlob } from 'fast-glob';
import { IEntry } from 'fast-glob/out/types/entries';
import { IOptions, IPartialOptions } from 'fast-glob/out/managers/options';
import { resolve as pathResolve } from 'path';
import { globCompare } from './util';



/** 
 * Simplified and sorted glob function (using fast-glob) for one or more pattern from current directory or a optional cwd one. 
 * 
 * NOTE: The result will be sorted by natural directory/subdir/filename order (as a would a recursive walk)
 * 
 * @returns always sorted result return Promise<string[]>
*/
export async function glob(pattern: string | string[], cwdOrFastGlobOptions?: string): Promise<string[]> {
	let opts: IPartialOptions | undefined = undefined;

	if (cwdOrFastGlobOptions != null) {
		opts = (typeof cwdOrFastGlobOptions === 'string') ? { cwd: cwdOrFastGlobOptions } : cwdOrFastGlobOptions;
	}

	const result = await _fastGlob(pattern, opts);
	const cwd = (opts) ? opts.cwd : undefined;
	const list = result.map(entryItem => {
		const path = (typeof entryItem === 'string') ? entryItem : entryItem.path;
		return (cwd) ? pathJoin(cwd, path) : path;
	});
	return list.sort(globCompare);
}

/** Remove one or more files */
export async function saferRemove(names: string | string[], cwd?: string) {
	const log = false
	const baseDir = (cwd) ? pathResolve(cwd) : pathResolve('./');

	for (const name of asArray(names)) {
		const fullPath = pathResolve(name);
		if (!fullPath.startsWith(baseDir)) {
			throw new Error(`Path to be removed does not look safe (nothing done): ${fullPath}\n\tCause: Does not belong to ${baseDir}`);
		}
		const exists = await pathExists(fullPath);
		if (exists) {
			return remove(fullPath);
		}
	}

}


//#region    ---------- Utils ---------- 
function asArray(names: string | string[]) {
	return (names instanceof Array) ? names : [names];
}
//#endregion ---------- /Utils ---------- 