import { PayPalSubscriptionRepository } from "../domain/PayPalSubscriptionRepository";

export class PayPalSubscriptionDeleter {
	constructor(private readonly repository: PayPalSubscriptionRepository) {}

	async delete(id: string): Promise<void> {
		// …
	}
}
