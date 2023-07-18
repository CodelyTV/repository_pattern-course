import { User } from "../domain/User";
import { UserId } from "../domain/UserId";
import { UserRepository } from "../domain/UserRepository";
import { MySqlUserDao } from "./MySqlUserDao";

export class MySqlUserDaoRepository implements UserRepository {
	constructor(private readonly dao: MySqlUserDao) {}

	async save(user: User): Promise<void> {
		await this.dao.save(user);
	}

	async search(id: UserId): Promise<User | null> {
		return await this.dao.search(id.value);
	}
}
