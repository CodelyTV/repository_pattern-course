export class UserDoesNotExistError extends Error {
	message = `The user ${this.id} does not exist`;

	constructor(readonly id: string) {
		super();
	}
}
