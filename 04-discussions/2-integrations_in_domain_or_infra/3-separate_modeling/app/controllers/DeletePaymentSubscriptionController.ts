import { PaymentSubscriptionCreator } from "../../src/payment_subscription/application/PaymentSubscriptionCreator";

export class DeletePaymentSubscriptionController {
	constructor(private readonly creator: PaymentSubscriptionCreator) {}

	async delete(request: {
		id: string;
		token: string;
		email: string;
		securityToken: string;
	}): Promise<void> {
		this.ensureTokenIsValid(request.securityToken);

		await this.creator.create(request.id, request.token, request.email);
	}

	private ensureTokenIsValid(securityToken: string): void {
		if (securityToken !== "1234") {
			throw new Error("Invalid token");
		}
	}
}
