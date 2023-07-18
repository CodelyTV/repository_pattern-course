import { User } from "../domain/User";

export class UserRegistrar {
	constructor(private readonly saveUser: (user: User) => Promise<void>) {}

	async register(id: string, email: string): Promise<void> {
		const user = new User(id, email);

		await this.saveUser(user);
	}
}
