import { MariaDBConnection } from "../../shared/infrastructure/MariaDBConnection";
import { User } from "../domain/User";
import { UserDAO } from "../domain/UserDAO";

export class MySqlUserDao implements UserDAO {
	constructor(private readonly connection: MariaDBConnection) {}

	async save(user: User): Promise<void> {
		const query = `INSERT INTO users (id, email) VALUES ('${user.id.value}', '${user.email}')`;

		await this.connection.execute(query);
	}

	async update(user: User, params: Map<string, string>): Promise<void> {
		const paramsToUpdate = this.paramsToSetFormat(params);

		const query = `UPDATE users SET ${paramsToUpdate.toString()} WHERE id ('${user.id.value}')`;

		await this.connection.execute(query);
	}

	async search(id: string): Promise<User | null> {
		const query = `SELECT * FROM users WHERE id='${id}'`;

		const result = await this.connection.searchOne<{ id: string; email: string }>(query);

		if (!result) {
			return null;
		}

		return new User(result.id, result.email);
	}

	async delete(user: User): Promise<void> {
		const query = `DELETE FROM users WHERE id ('${user.id.value}')`;

		await this.connection.execute(query);
	}

	private paramsToSetFormat(params: Map<string, string>) {
		// @todo
		return Array.from(params.entries());
	}
}
