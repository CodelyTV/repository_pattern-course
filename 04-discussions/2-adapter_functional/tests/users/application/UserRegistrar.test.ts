import { v4 } from "uuid";

import { UserRegistrar } from "../../../src/users/application/UserRegistrar";
import { User } from "../../../src/users/domain/User";
import { MockUserRepository } from "../infrastructure/MockUserRepository";

const validEmail = "validemail@gmail.com";
const validId = v4();

describe("UserRegistrar", () => {
	it("registers a user without throwing errors when all data is valid", async () => {
		const repository = new MockUserRepository();
		const userRegistrar = new UserRegistrar(repository.save.bind(repository));

		const expectedUser = new User(validId, validEmail);

		repository.shouldSave(expectedUser);

		await userRegistrar.register(validId, validEmail);
	});
});
