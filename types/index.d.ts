export * from 'fs-extra';
/**
 * Simplified and sorted glob function (using fast-glob) for one or more pattern from current directory or a optional cwd one.
 *
 * NOTE: The result will be sorted by natural directory/subdir/filename order (as a would a recursive walk)
 *
 * @returns always sorted result return Promise<string[]>
*/
export declare function glob(pattern: string | string[], cwdOrFastGlobOptions?: string): Promise<string[]>;
/** Remove one or more files */
export declare function saferRemove(names: string | string[], cwd?: string): Promise<void>;
