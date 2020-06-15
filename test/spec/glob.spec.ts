import * as assert from 'assert';
import { glob } from '../../src/index';
import { globCompare } from '../../src/util';

const sort_data_src = ['test/data/src/pcss/0_main.pcss',
	'test/data/src/views/HomeView.pcss',
	'test/data/src/pcss/pages/home.pcss',
	'test/data/src/views/Demo/DemoButtons.pcss',
	'test/data/src/views/Demo/DemoCards.pcss',
	'test/data/src/pcss/z/other/other.pcss',
	'test/data/src/pcss/vars-colors.pcss',
	'test/data/src/views/Demo/DemoTypo.pcss'];

const src_data_expected = [
	'test/data/src/pcss/0_main.pcss',
	'test/data/src/pcss/vars-colors.pcss',
	'test/data/src/pcss/pages/home.pcss',
	'test/data/src/pcss/z/other/other.pcss',
	'test/data/src/views/HomeView.pcss',
	'test/data/src/views/Demo/DemoButtons.pcss',
	'test/data/src/views/Demo/DemoCards.pcss',
	'test/data/src/views/Demo/DemoTypo.pcss',
];


describe("glob", function () {

	it("glob-single", async () => {
		const files = await glob('src/*.ts');
		assert.strictEqual(files[0], 'src/index.ts');
		assert.strictEqual(files.length, 2);
	});


	it("glob-array", async () => {
		const files = await glob(['src/*.ts', 'test/spec/*.ts']);
		assert.strictEqual(files[0], 'src/index.ts');
		assert.strictEqual(files[1], 'src/util.ts');
		assert.strictEqual(files.length, 4);
	});


	it("glob-sort", async () => {
		const files = sort_data_src;
		const sortedFiles = files.sort(globCompare);
		assert.deepEqual(sortedFiles, src_data_expected);
	});


	it("glob-cwd", async () => {
		const files = await glob(['**/*.sql'], 'test/data/');
		assert.strictEqual(files[0], 'test/data/02_two.sql');
		assert.strictEqual(files.length, 3);
	});


});

