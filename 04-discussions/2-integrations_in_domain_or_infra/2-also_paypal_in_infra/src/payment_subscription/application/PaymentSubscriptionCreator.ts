import { PaymentSubscription } from "../domain/PaymentSubscription";
import { PaymentSubscriptionRepository } from "../domain/PaymentSubscriptionRepository";

export class PaymentSubscriptionCreator {
	constructor(private readonly repository: PaymentSubscriptionRepository) {}

	async create(id: string, token: string, email: string): Promise<void> {
		const name = this.extractNameFromToken(token);

		const subscription = new PaymentSubscription(id, token, email, name);

		await this.repository.create(subscription);
	}

	private extractNameFromToken(token: string): string {
		return token[0];
	}
}
