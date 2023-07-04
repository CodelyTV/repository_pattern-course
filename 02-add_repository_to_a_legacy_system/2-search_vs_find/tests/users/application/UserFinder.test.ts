import { v4 } from "uuid";

import { UserFinder } from "../../../src/users/application/UserFinder";
import { User } from "../../../src/users/domain/User";
import { UserDoesNotExistError } from "../../../src/users/domain/UserDoesNotExistError";
import { UserId } from "../../../src/users/domain/UserId";
import { MockUserRepository } from "../infrastructure/MockUserRepository";

const validEmail = "validemail@gmail.com";
const validId = v4();

describe("UserFinder", () => {
	it("search an existing user", async () => {
		const repository = new MockUserRepository();
		const searcher = new UserFinder(repository);

		const expectedUser = new User(validId, validEmail);

		repository.shouldSearch(expectedUser);

		expect(await searcher.search(expectedUser.id.value)).toStrictEqual(expectedUser);
	});

	it("throw an error when a user does not exist", async () => {
		const repository = new MockUserRepository();
		const searcher = new UserFinder(repository);

		const id = new UserId(validId);

		repository.shouldNotSearch(id);

		await expect(() => searcher.search(id.value)).rejects.toThrow(
			new UserDoesNotExistError(id.value)
		);
	});
});
