export class PayPalSubscription {
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly name: string
	) {}
}
