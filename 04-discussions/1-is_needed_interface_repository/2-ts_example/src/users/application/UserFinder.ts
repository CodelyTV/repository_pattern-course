import { User } from "../domain/User";
import { UserDoesNotExistError } from "../domain/UserDoesNotExistError";
import { UserId } from "../domain/UserId";

export class UserFinder {
	constructor(private readonly searchInRepository: (id: UserId) => Promise<User | null>) {}

	async search(id: string): Promise<User> {
		const user = await this.searchInRepository(new UserId(id));

		if (user === null) {
			throw new UserDoesNotExistError(id);
		}

		return user;
	}
}
