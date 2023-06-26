import { MariaDBConnection } from "../../shared/infrastructure/MariaDBConnection";

export class UserRegistrar {
	constructor(private readonly connection: MariaDBConnection) {}

	async register(id: string, email: string, birthdate: Date): Promise<void> {
		const formattedDate = birthdate.toISOString().slice(0, 19).replace("T", " ");

		const query = `INSERT INTO users (id, email, birthdate) VALUES ('${id}', '${email}', '${formattedDate}')`;

		await this.connection.execute(query);
	}
}
