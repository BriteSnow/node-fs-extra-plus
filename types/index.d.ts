export * from 'fs-extra';
/** Simplified glob function (using fast-glob) for one or more pattern from current directory or a optional cwd one
 * @returns always return Promise<string[]>
*/
export declare function glob(pattern: string | string[], cwdOrFastGlobOptions?: string): Promise<string[]>;
/** Remove one or more files */
export declare function saferRemove(names: string | string[], cwd?: string): Promise<void>;
