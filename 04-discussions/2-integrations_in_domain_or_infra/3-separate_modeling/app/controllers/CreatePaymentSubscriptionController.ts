import { PaymentSubscriptionCreator } from "../../src/payment_subscription/application/PaymentSubscriptionCreator";
import { DeletePaymentSubscriptionController } from "./DeletePaymentSubscriptionController";

export class CreatePaymentSubscriptionController {
	constructor(
		private readonly creator: PaymentSubscriptionCreator,
		private readonly deleteController: DeletePaymentSubscriptionController
	) {}

	async post(request: {
		id?: string;
		product_id?: string;
		token?: string;
		email?: string;
		name?: string;
		status?: string;
		securityToken?: string;
		header?: { token: string };
	}): Promise<void> {
		this.ensureSecurityTokenIsValid(request.securityToken);
		this.ensureTokenIsValid(request.header?.token);

		if (this.isDeletedPaymentRequest(request.status)) {
			return this.deleteController.delete({
				id: request.product_id,
				token: "",
				email: "",
				securityToken: "",
			});
		}

		await this.creator.create(
			request.id,
			request.product_id,
			request.token,
			request.email,
			request.name
		);
	}

	private ensureSecurityTokenIsValid(securityToken?: string): void {
		if (securityToken === undefined) {
			return;
		}

		if (securityToken !== "1234") {
			throw new Error("Invalid token");
		}
	}

	private ensureTokenIsValid(token?: string): void {
		if (token === undefined) {
			return;
		}

		if (token !== "4321") {
			throw new Error("Invalid token");
		}
	}

	private isDeletedPaymentRequest(status: string | undefined): boolean {
		return status === "deleted";
	}
}
