import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	async register(id: string, email: string): Promise<void> {
		const user = new User(id, email);

		await this.repository.save(user);
	}
}
