import { StripeSubscriptionCreator } from "../../src/stripe_subscription/application/StripeSubscriptionCreator";
import { StripeSubscriptionDeleter } from "../../src/stripe_subscription/application/StripeSubscriptionDeleter";

export class StripeSubscriptionController {
	constructor(
		private readonly creator: StripeSubscriptionCreator,
		private readonly deleter: StripeSubscriptionDeleter
	) {}

	async post(request: {
		id: string;
		token: string;
		email: string;
		securityToken: string;
	}): Promise<void> {
		this.ensureSecurityTokenIsValid(request.securityToken);

		await this.creator.create(request.id, request.token, request.email);
	}

	async delete(request: {
		id: string;
		token: string;
		email: string;
		securityToken: string;
	}): Promise<void> {
		this.ensureSecurityTokenIsValid(request.securityToken);

		await this.deleter.delete(request.id);
	}

	private ensureSecurityTokenIsValid(securityToken: string): void {
		if (securityToken !== "1234") {
			throw new Error("Invalid token");
		}
	}
}
