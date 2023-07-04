import { v4 } from "uuid";

import { MariaDBConnection } from "../src/shared/infrastructure/MariaDBConnection";
import { UserRegistrar } from "../src/users/application/UserRegistrar";
import { User } from "../src/users/domain/User";

const validEmail = "validemail@gmail.com";
const validId = v4();

describe("UserRegistrar", () => {
	it("[without mock using connection] registers a user without throwing errors when all data is valid", async () => {
		const connection = new MariaDBConnection();
		const userRegistrar = new UserRegistrar(connection);

		await userRegistrar.register(validId, validEmail);

		const expectedUser = new User(validId, validEmail);

		const result = await connection.searchOne<{ id: string; email: string }>(
			`SELECT * FROM users WHERE id='${validId}'`
		);

		const actual = !result ? null : new User(result.id, result.email);

		expect(actual).toEqual(expectedUser);
	});

	// it("[without mock using searcher] registers a user without throwing errors when all data is valid", async () => {
	// 	const connection = new MariaDBConnection();
	// 	const userRegistrar = new UserRegistrar(connection);
	//
	// 	await userRegistrar.register(validId, validEmail);
	//
	// 	const userSearcher = new UserSearcher(connection);
	// 	const expectedUser = new User(validId, validEmail);
	//
	// 	expect(await userSearcher.search(validId)).toEqual(expectedUser);
	// });

	// it("[with mock] registers a user without throwing errors when all data is valid", async () => {
	// 	const connection = new MariaDBConnection();
	// 	const userRegistrar = new UserRegistrar(connection);
	// 	const repositorySave = jest.spyOn(connection, "execute");
	//
	// 	await userRegistrar.register(validId, validEmail, validBirthdate);
	// 	const expectedQuery = `INSERT INTO users (id, email, birthdate) VALUES ('${validId}', '${validEmail}', '${validBirthdateFormatted}')`;
	//
	// 	expect(repositorySave).toHaveBeenCalledWith(expectedQuery);
	// });
});
