export class WelcomeEmail {
	constructor(
		public readonly name: string,
		public readonly email: string,
	) {}

	static create(name: string, email: string): WelcomeEmail {
		return new WelcomeEmail(name, email);
	}
}
