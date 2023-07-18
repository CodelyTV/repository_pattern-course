import { User } from "../domain/User";
import { UserDoesNotExistError } from "../domain/UserDoesNotExistError";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";

export class UserFinder {
	constructor(private readonly repository: UserRepository) {}

	async search(id: string): Promise<User> {
		const user = await this.repository.search(new UserId(id));

		if (user === null) {
			throw new UserDoesNotExistError(id);
		}

		return user;
	}
}
