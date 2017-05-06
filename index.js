const path = require("path");
var fs = require("fs-extra");

Object.assign(fs, {watchDirs, unlinkFiles, listFiles, listDirs});

module.exports = fs;


async function watchDirs(dirs, fileSuffix, fn){
	// make sure the pass the dirs (as a shallow clone) as last argument to seed the allDirs with it
	var allDirs = await listDirs(dirs, true, dirs.slice(0));

	allDirs.forEach(dir => {
		fs.watch(dir, function(action, name){
			if (name.endsWith(fileSuffix)){
				fn(action, name);
			}
		});
	});	
}


async function unlinkFiles(files){
	for (var file of files){
		let exists = await fs.pathExists(file);
		if (exists){
			await fs.unlink(file);
		}else{
			throw `Can't unlink [${file}], does not exist.`;
		}
	}
}


const defaultListFilesOpts = {
	deep: true
};

// build a flat file list from a dir (or directories) that match and ending
// - dirs: Can be a single string (dir path) or an array of dir paths
// - opts: {String}: if string, then, it is the .suffix
//   - deep: Tell if we go recursive or not (default true)
//   - suffix:string, // file suffix (i.e. endsWith), for example the extension (default: none)
//   - prefix:string, // file prefix (i.e. startsWith)
//   - match:regexString|function, // additional filtering (default: none) NOTE: NOT supported yet
//   - from:number, // from this number (inclusive)
//   - to:number, // to this number (inclusive)
//   - numRgx  // regex used to extract the number from the path (default: /^(\d+)/)
//
// returns: when nothing is found, still return an empty array.
async function listFiles(dirs, opts,fileList = []){
	var subDirs = [];
	// make it an array
	dirs = (dirs instanceof Array)?dirs:[dirs];

	// first if the opts is a string, then, interpret it as suffix
	opts = (typeof opts === "string")?{suffix:opts}:opts;

	// second, apply the opts to the default ones
	opts = Object.assign({},defaultListFilesOpts, opts);

	for (let dir of dirs){

		var files = await fs.readdir(dir);

		for (let file of files){
			let filePath = path.join(dir, file);
			if (fs.statSync(filePath).isDirectory()){
				subDirs.push(filePath);
			}else if (match(file, opts)){
				fileList.push(filePath);
			}			
		}
	}

	// we do the subdirs after, so that the root files are before in the list that the sub directory files
	if (opts.deep && subDirs.length > 0){
		await listFiles(subDirs, opts, fileList);
	}

	return fileList;
}


var defaultNumRgx = /^(\d+)/;
function match(fileName, opts){
	// if not matchOpts, then always match
	if (opts == null){
		return true;
	}

	// check the .suffix
	if (opts.suffix != null && !fileName.endsWith(opts.suffix)){
		return false;
	}

	// check the .prefix
	if (opts.prefix != null && !fileName.startsWith(opts.prefix)){
		return false;
	}

	// check the .match
	if (opts.match != null){
		let matching = opts.match.exec(fileName);
		if (!matching){
			return false;
		}
	}

	// check the .from and .to
	if (opts.from != null || opts.to != null){
		let numRgx = opts.numRgx || defaultNumRgx;
		let matching = numRgx.exec(fileName);

		if (matching && matching[1]){
			let num = parseInt(matching[1],10);

			// if the opts.from is not defined, then, set it a 0 by default
			let from = (opts.from != null)?opts.from:0;
			// we always have a opts.from (default to 0), so, we can compare with num
			if (num >= from){
				// if opts.to is a number (and defined) and num is greater, then, return false
				if (typeof opts.to === "number" && num > opts.to){
					return false;
				}
			}else{
				return false;
			}			

		}else{
			// if we do not have a match, we can return false
			return false;
		}
	}

	return true;
}

// build a flat dir list of those dirs and their sub dirs
async function listDirs(dirs, deep = true, dirList = []){

	// make it an array
	dirs = (dirs instanceof Array)?dirs:[dirs];

	for (let dir of dirs){

		let subDirs = await fs.readdir(dir);

		subDirs = subDirs.filter(f => fs.statSync(path.join(dir, f)).isDirectory()).map(f => path.join(dir, f));
		
		// we add this dir list to 
		Array.prototype.push.apply(dirList, subDirs);

		if (deep){
			await listDirs(subDirs, deep, dirList);	
		}		
	}

	return dirList;
}