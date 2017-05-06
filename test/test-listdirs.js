const assert = require("assert");
const fs = require ("../index.js");


describe("listDirs", function(){

	it("listDirs", async () => {
		var srcDirs = ["./node_modules/fs-extra"];
		var dirs = await fs.listDirs(srcDirs);
		assert.equal(dirs[0], "node_modules/fs-extra/docs");
		assert.equal(dirs[1], "node_modules/fs-extra/lib");
		assert(dirs.length === 15, "dirs size should be 15 but is " + dirs.length);
	});

	it("listDirs deep false", async () => {
		var srcDirs = ["./node_modules/fs-extra"];
		var dirs = await fs.listDirs(srcDirs, false);
		assert.equal(dirs[0], "node_modules/fs-extra/docs");
		assert.equal(dirs[1], "node_modules/fs-extra/lib");
		assert(dirs.length === 2, "dirs size should be 2 but is " + dirs.length);
	});

});

