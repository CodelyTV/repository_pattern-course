import { v4 } from "uuid";

import { UserSearcher } from "../../../src/users/application/UserSearcher";
import { User } from "../../../src/users/domain/User";
import { UserId } from "../../../src/users/domain/UserId";
import { MockUserRepository } from "../infrastructure/MockUserRepository";

const validEmail = "validemail@gmail.com";
const validId = v4();

describe("UserSearcher", () => {
	it("search an existing user", async () => {
		const repository = new MockUserRepository();
		const searcher = new UserSearcher(repository);

		const expectedUser = new User(validId, validEmail);

		repository.shouldSearch(expectedUser);

		expect(await searcher.search(expectedUser.id.value)).toStrictEqual(expectedUser);
	});

	it("return null with a non existing user", async () => {
		const repository = new MockUserRepository();
		const searcher = new UserSearcher(repository);

		const id = new UserId(validId);

		repository.shouldNotSearch(id);

		expect(await searcher.search(id.value)).toBeNull();
	});
});
