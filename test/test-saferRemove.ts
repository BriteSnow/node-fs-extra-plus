import * as assert from 'assert';
import { copy } from 'fs-extra';
import { saferRemove } from '../src/index';


describe("saferRemove", function () {

	it("saferRemove-success-remove", async () => {
		const tmpFile = 'test/data/01-one-copy.txt';
		await copy('test/data/01-one.txt', tmpFile);
		await saferRemove(tmpFile);
		// if here, all good
	});

	it("saferRemove-throw-unsafe", async () => {
		const tmpFile = '../01-one-copy.txt';
		try {
			await saferRemove(tmpFile);
			// if we are here, it is not working
			throw new Error(`Should not be able to delete ${tmpFile}. BUG`);
		} catch (ex) {
			assert.strictEqual(`${ex}`.includes('Path to be removed does not'), true)
		}

	});



});

