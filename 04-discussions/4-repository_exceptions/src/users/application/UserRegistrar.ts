import { User } from "../domain/User";
import { UserAlreadyExist } from "../domain/UserAlreadyExist";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class UserRegistrar {
	constructor(private readonly repository: UserRepository) {}

	async register(id: string, email: string): Promise<void> {
		await this.ensureUserDoesNotExist(id);

		const user = new User(id, email);

		await this.repository.save(user);
	}

	private async ensureUserDoesNotExist(id: string) {
		if ((await this.repository.search(new UserId(id))) !== null) {
			throw new UserAlreadyExist(id);
		}
	}
}
