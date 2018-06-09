import * as assert from 'assert';
import { glob } from '../src/index';


describe("glob", function () {

	it("glob-single", async () => {
		const files = await glob('**/src/*.ts');
		assert.strictEqual(files[0], 'src/index.ts');
		assert.strictEqual(files.length, 1);
	});

	it("glob-array", async () => {
		const files = await glob(['**/src/*.ts', '**/test/*.ts']);
		assert.strictEqual(files[0], 'src/index.ts');
		assert.strictEqual(files[1], 'test/test-glob.ts');
		assert.strictEqual(files.length, 3);
	});

	it("glob-cwd", async () => {
		const files = await glob(['**/*.sql'], 'test/data/');
		assert.strictEqual(files[0], 'test/data/02_two.sql');
		assert.strictEqual(files.length, 3);
	});


});

