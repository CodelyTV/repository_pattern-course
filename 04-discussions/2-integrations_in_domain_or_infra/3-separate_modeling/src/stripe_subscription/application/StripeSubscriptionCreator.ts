import { StripeSubscription } from "../domain/StripeSubscription";
import { StripeSubscriptionRepository } from "../domain/StripeSubscriptionRepository";

export class StripeSubscriptionCreator {
	constructor(private readonly repository: StripeSubscriptionRepository) {}

	async create(id: string, token: string, email: string): Promise<void> {
		const name = this.extractNameFromToken(token);

		const subscription = new StripeSubscription(id, token, email, name);

		await this.repository.create(subscription);
	}

	private extractNameFromToken(token: string): string {
		return token[0];
	}
}
