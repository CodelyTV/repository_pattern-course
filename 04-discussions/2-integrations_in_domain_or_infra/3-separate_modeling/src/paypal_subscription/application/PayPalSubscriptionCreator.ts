import { PayPalSubscription } from "../domain/PayPalSubscription";
import { PayPalSubscriptionRepository } from "../domain/PayPalSubscriptionRepository";

export class PayPalSubscriptionCreator {
	constructor(private readonly repository: PayPalSubscriptionRepository) {}

	async create(id: string, email: string, name: string): Promise<void> {
		const subscription = new PayPalSubscription(id, email, name);

		await this.repository.create(subscription);
	}
}
