import { v4 } from "uuid";

import { MariaDBConnection } from "../src/shared/infrastructure/MariaDBConnection";
import { UserRegistrar } from "../src/users/application/UserRegistrar";

const validEmail = "validemail@gmail.com";
const validId = v4();
const currentDate = new Date();
const validBirthdate = new Date(
	currentDate.getFullYear() - 50,
	currentDate.getMonth(),
	currentDate.getDate()
);
const validBirthdateFormatted = new Date().toISOString().slice(0, 19).replace("T", " ");

describe("UserRegistrar", () => {
	// it("[without mock] registers a user without throwing errors when all data is valid", async () => {
	// 	const connection = new MariaDBConnection();
	// 	const userRegistrar = new UserRegistrar(connection);
	//
	// 	await userRegistrar.register(validId, validEmail, validBirthdate);
	//
	// 	const userSearcher = new UserSearcher(connection);
	// 	const expectedUser = new User(validId, validEmail, validBirthdate);
	//
	// 	expect(await userSearcher.search(validId)).toEqual(expectedUser);
	// });

	it("[with mock] registers a user without throwing errors when all data is valid", async () => {
		const connection = new MariaDBConnection();
		const userRegistrar = new UserRegistrar(connection);
		const repositorySave = jest.spyOn(connection, "execute");

		await userRegistrar.register(validId, validEmail, validBirthdate);
		const expectedQuery = `INSERT INTO users (id, email, birthdate) VALUES ('${validId}', '${validEmail}', '${validBirthdateFormatted}')`;

		expect(repositorySave).toHaveBeenCalledWith(expectedQuery);
	});
});
