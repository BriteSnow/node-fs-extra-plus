
Same `fs-extra` object returned, just with the following additional methods. 

> Note 1: Requires async/await (and therefore >7.10).

> Note 2: Typescript type declation included.

### Changelogs

- 2.0.0: Updated to fs-extra `^5.0.0`, deprecated `watchDirs` (noops), updated mocha to `^5.0.1`

### .listFiles(dirs, opts)

Build a flat file list from a dir (or directories) that match and ending. 

- dirs: Can be a single string (dir path) or an array of dir paths
- opts: {String}: if string, then, it is the .suffix
  - deep: Tell if we go recursive or not (default true)
  - suffix:string, file suffix (i.e. endsWith), for example the extension (default: none)
  - prefix:string, file prefix (i.e. startsWith)
  - match:regexString|function, additional filtering (default: none) NOTE: NOT supported yet
  - from:number, from this number (inclusive)
  - to:number, to this number (inclusive)
  - numRgx  regex used to extract the number from the path (default: /^(\d+)/)


Examples: 

```js
// all files ending with ".md" from two dir (and their sub directories)
var files = await fs.listFiles(["first/dir/", "second/dir/"],".md");

// all files from first/dir and sub directory starting with "drop)" and ending with ".sql" 
files = await fs.listFiles("first/dir", {prefix:"drop_", suffix: ".sql"});

// all files ending with ".sql" and starting with a number between 1 and 3 (e.g. 001_my_file.sql)
files = await fs.listFiles("first/dir", {from:1, to: 3, suffix:".sql"})

// all files ending with ".sql" and starting with a number between 1 and 3, 2 directory down (2 including the root)
files = await fs.listFiles("first/dir", {from:1, to: 3, deep: 2, suffix:".sql"})
```

### .listDirs(dirs, deep = true, seedDirs = [])

```js
// add sub dirs (deep) from these top directories
var dirs = await fs.listDirs(["./node_modules/fs-extra"]);

// Just first level down
var dirs = await fs.listDirs(["./node_modules/fs-extra"], false);

```

### .watch(dirs, fileNameSuffix)

```js
fs.watchDirs(["first/dir/", "second/dir/"],".pcss", (action, name) => {
    // passthrough of arguments from fs.watch (only be called on filename that end with the suffix above)
    // action "change"
    // name (the file/dir that is changed)
})
```

