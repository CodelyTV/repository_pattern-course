import { MariaDBConnection } from "../../shared/infrastructure/MariaDBConnection";

export class UserRegistrar {
	constructor(private readonly connection: MariaDBConnection) {}

	async register(id: string, email: string): Promise<void> {
		const query = `INSERT INTO users (id, email) VALUES ('${id}', '${email}')`;

		await this.connection.execute(query);
	}
}
