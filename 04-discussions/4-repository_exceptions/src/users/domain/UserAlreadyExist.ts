export class UserAlreadyExist extends Error {
	message = `The user ${this.id} already exist`;

	constructor(readonly id: string) {
		super();
	}
}
