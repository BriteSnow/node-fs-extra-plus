export * from 'fs-extra';
import { pathExists, remove } from 'fs-extra';
import { async as _fastGlob } from 'fast-glob';
import { IEntry } from 'fast-glob/out/types/entries';
import { IOptions, IPartialOptions } from 'fast-glob/out/managers/options';
import { resolve as pathResolve } from 'path';



/** Simplified glob function (using fast-glob) for one or more pattern from current directory or a optional cwd one 
 * @returns always return Promise<string[]>
*/
export async function glob(pattern: string | string[], cwdOrFastGlobOptions?: string): Promise<string[]> {
	let opts: IPartialOptions | undefined = undefined;

	if (cwdOrFastGlobOptions != null) {
		opts = (typeof cwdOrFastGlobOptions === 'string') ? { cwd: cwdOrFastGlobOptions } : cwdOrFastGlobOptions;
	}

	const result = await _fastGlob(pattern, opts);
	return result.map(entryItem => (typeof entryItem === 'string') ? entryItem : entryItem.path);
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