import { StripeSubscriptionRepository } from "../domain/StripeSubscriptionRepository";

export class StripeSubscriptionDeleter {
	constructor(private readonly repository: StripeSubscriptionRepository) {}

	async delete(id: string): Promise<void> {
		// …
	}
}
