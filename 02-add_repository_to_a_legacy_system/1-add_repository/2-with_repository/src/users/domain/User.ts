import { UserId } from "./UserId";

export class User {
	public readonly id: UserId;

	constructor(id: string, public email: string) {
		this.id = new UserId(id);
	}
}
