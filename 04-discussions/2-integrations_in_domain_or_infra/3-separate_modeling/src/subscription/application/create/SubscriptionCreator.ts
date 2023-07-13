import { Subscription } from "../../domain/Subscription";
import { SubscriptionRepository } from "../../domain/SubscriptionRepository";

export class SubscriptionCreator {
	constructor(private readonly repository: SubscriptionRepository) {}

	async create(id: string, platform: "stripe" | "paypal"): Promise<void> {
		const subscription = new Subscription(id, platform);

		await this.repository.create(subscription);
	}
}
