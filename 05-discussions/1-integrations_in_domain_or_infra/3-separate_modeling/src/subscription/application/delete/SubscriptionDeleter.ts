import { SubscriptionRepository } from "../../domain/SubscriptionRepository";

export class SubscriptionDeleter {
	constructor(private readonly repository: SubscriptionRepository) {}

	async delete(id: string): Promise<void> {
		// …
	}
}
