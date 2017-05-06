const assert = require("assert");
const fs = require ("../index.js");


describe("listFiles", function(){

	it("listFiles suffix", async () => {
		var dirs = ["./node_modules/fs-extra"];
		var files = await fs.listFiles(dirs,".md");
		assert.equal(files[0], "node_modules/fs-extra/CHANGELOG.md");
		assert.equal(files[1], "node_modules/fs-extra/README.md");
		assert(files.length > 2, "files size should be > 2 but is " + files.length);
	});

	it("listFiles prefix", async () => {
		var dirs = ["./node_modules/fs-extra"];
		var files = await fs.listFiles(dirs, {prefix: "ensure"});
		assert.equal(files[0], "node_modules/fs-extra/docs/ensureDir-sync.md");
		assert.equal(files.length, 8, "number of match");
	});


	it("listFiles match", async () => {
		var dirs = ["./node_modules/fs-extra"];
		var files = await fs.listFiles(dirs, {match: /^enSUre/i});
		assert.equal(files[0], "node_modules/fs-extra/docs/ensureDir-sync.md");
		assert.equal(files.length, 8, "number of match");		
	});

	it("listFiles from", async () => {
		var dirs = "./test/mock/";
		var files = await fs.listFiles(dirs, {from: 0});
		assert.equal(files.length, 4, "number of files from 0");

		files = await fs.listFiles(dirs, {from: 2});
		assert.equal(files.length, 2, "number of files from 2");		
	});	

	it("listFiles to", async () => {
		var dirs = "./test/mock/";
		var files = await fs.listFiles(dirs, {to: 2});
		assert.equal(files.length, 3, "number of files to 2");

		files = await fs.listFiles(dirs, {to: 10});
		assert.equal(files.length, 4, "number of files to 10");		
	});

	it("listFiles from to", async () => {
		var dirs = "./test/mock/";
		var files = await fs.listFiles(dirs, {from: 1, to: 2});
		assert.equal(files.length, 2, "number of files from 1 to 2");

		files = await fs.listFiles(dirs, {from:1, to: 10});
		assert.equal(files.length, 3, "number of files from 1 to 10");		
	});

});

