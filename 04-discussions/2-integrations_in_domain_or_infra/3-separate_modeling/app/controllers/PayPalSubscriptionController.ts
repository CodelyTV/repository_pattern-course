import { PayPalSubscriptionCreator } from "../../src/paypal_subscription/application/PayPalSubscriptionCreator";
import { PayPalSubscriptionDeleter } from "../../src/paypal_subscription/application/PayPalSubscriptionDeleter";

export class PayPalSubscriptionController {
	constructor(
		private readonly creator: PayPalSubscriptionCreator,
		private readonly deleter: PayPalSubscriptionDeleter
	) {}

	async post(request: {
		product_id: string;
		email: string;
		name: string;
		status: "created" | "deleted";
		header: { token: string };
	}): Promise<void> {
		this.ensureTokenIsValid(request.header.token);

		switch (request.status) {
			case "created": {
				await this.creator.create(request.product_id, request.email, request.name);
				break;
			}
			case "deleted": {
				await this.deleter.delete(request.product_id);
				break;
			}
		}
	}

	private ensureTokenIsValid(token?: string): void {
		if (token !== "4321") {
			throw new Error("Invalid token");
		}
	}
}
