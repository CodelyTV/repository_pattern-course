export class Subscription {
	constructor(public readonly id: string, public readonly platform: "stripe" | "paypal") {}

	static stripe(id: string): Subscription {
		return new Subscription(id, "stripe");
	}

	static paypal(id: string): Subscription {
		return new Subscription(id, "paypal");
	}
}
