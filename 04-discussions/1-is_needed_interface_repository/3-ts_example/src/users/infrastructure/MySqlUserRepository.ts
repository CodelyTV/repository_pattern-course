import { MariaDBConnection } from "../../shared/infrastructure/MariaDBConnection";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class MySqlUserRepository implements UserRepository {
	constructor(private readonly connection: MariaDBConnection) {}

	async save(user: User): Promise<void> {
		const query = `INSERT INTO users (id, email) VALUES ('${user.id.value}', '${user.email}')`;

		await this.connection.execute(query);
	}

	async search(id: UserId): Promise<User | null> {
		const query = `SELECT * FROM users WHERE id='${id.value}'`;

		const result = await this.connection.searchOne<{ id: string; email: string }>(query);

		if (!result) {
			return null;
		}

		return new User(result.id, result.email);
	}
}
