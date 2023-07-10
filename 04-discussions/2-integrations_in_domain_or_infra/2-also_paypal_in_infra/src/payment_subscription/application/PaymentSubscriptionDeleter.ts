import { PaymentSubscriptionRepository } from "../domain/PaymentSubscriptionRepository";

export class PaymentSubscriptionDeleter {
	constructor(private readonly repository: PaymentSubscriptionRepository) {}

	async create(id: string): Promise<void> {
		// …
	}
}
