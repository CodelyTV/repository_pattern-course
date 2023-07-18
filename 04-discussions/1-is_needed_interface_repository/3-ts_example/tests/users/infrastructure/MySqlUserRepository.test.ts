import { v4 } from "uuid";

import { MariaDBConnection } from "../../../src/shared/infrastructure/MariaDBConnection";
import { User } from "../../../src/users/domain/User";
import { UserId } from "../../../src/users/domain/UserId";
import { MySqlUserRepository } from "../../../src/users/infrastructure/MySqlUserRepository";

const validEmail = "validemail@gmail.com";

describe("MySqlUserRepository", () => {
	it("save a user", async () => {
		const repository = new MySqlUserRepository(new MariaDBConnection());

		const user = new User(v4(), validEmail);

		await repository.save(user);
	});

	it("search an existing user", async () => {
		const repository = new MySqlUserRepository(new MariaDBConnection());

		const user = new User(v4(), validEmail);

		await repository.save(user);

		expect(await repository.search(user.id)).toStrictEqual(user);
	});

	it("return null with a non existing user", async () => {
		const repository = new MySqlUserRepository(new MariaDBConnection());

		const id = new UserId(v4());

		expect(await repository.search(id)).toBeNull();
	});
});
