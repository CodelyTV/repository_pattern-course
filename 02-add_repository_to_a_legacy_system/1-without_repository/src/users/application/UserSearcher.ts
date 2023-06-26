import { MariaDBConnection } from "../../shared/infrastructure/MariaDBConnection";
import { User } from "../domain/User";

export class UserSearcher {
	constructor(private readonly connection: MariaDBConnection) {}

	async search(id: string): Promise<User | null> {
		const query = `SELECT * FROM users WHERE id='${id}'`;

		const result = await this.connection.searchOne<{ id: string; email: string; birthdate: Date }>(
			query
		);

		if (!result) {
			return null;
		}

		return new User(result.id, result.email, new Date(result.birthdate));
	}
}
