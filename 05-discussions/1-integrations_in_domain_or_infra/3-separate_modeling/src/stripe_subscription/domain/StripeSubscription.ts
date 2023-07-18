export class StripeSubscription {
	constructor(
		public readonly id: string,
		public readonly token: string,
		public readonly email: string,
		public readonly name: string
	) {}
}
