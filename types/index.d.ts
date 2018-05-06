
export * from "fs-extra";

export interface ListOptions {
	/** Tell if we go recursive or not (default true) */
	deep?: number | boolean;
	/** File suffix to match (i.e. endsWith), for example the extension (default: none) */
	suffix?: string;
	/** file prefix (i.e. startsWith) */
	prefix?: string;
	/** Additional filtering */
	match?: RegExp;
	/** from this number (inclusive) */
	from?: number;
	/** to this number (inclusive) */
	to?: number;
	/** regex used to extract the number from the path (default: /^(\d+)/) */
	numRgx?: RegExp;
}

export function listFiles(dirs: string | string[],
	opts: ListOptions | string,
	fileList?: string[],
	depth?: boolean): Promise<any>;


export function unlinkFiles(files: string[]): void;

export function listDirs(dirs: string | string[], deep?: boolean, dirList?: string[]): string[];

