"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("fs-extra"));
const fs_extra_1 = require("fs-extra");
const fast_glob_1 = require("fast-glob");
const path_1 = require("path");
/** Simplified glob function (using fast-glob) for one or more pattern from current directory or a optional cwd one
 * @returns always return Promise<string[]>
*/
async function glob(pattern, cwdOrFastGlobOptions) {
    let opts = undefined;
    if (cwdOrFastGlobOptions != null) {
        opts = (typeof cwdOrFastGlobOptions === 'string') ? { cwd: cwdOrFastGlobOptions } : cwdOrFastGlobOptions;
    }
    const result = await fast_glob_1.async(pattern, opts);
    return result.map(entryItem => (typeof entryItem === 'string') ? entryItem : entryItem.path);
}
exports.glob = glob;
/** Remove one or more files */
async function saferRemove(names, cwd) {
    const log = false;
    const baseDir = (cwd) ? path_1.resolve(cwd) : path_1.resolve('./');
    for (const name of asArray(names)) {
        const fullPath = path_1.resolve(name);
        if (!fullPath.startsWith(baseDir)) {
            throw new Error(`Path to be removed does not look safe (nothing done): ${fullPath}\n\tCause: Does not belong to ${baseDir}`);
        }
        const exists = await fs_extra_1.pathExists(fullPath);
        if (exists) {
            return fs_extra_1.remove(fullPath);
        }
    }
}
exports.saferRemove = saferRemove;
function asArray(names) {
    return (names instanceof Array) ? names : [names];
}
exports.asArray = asArray;
