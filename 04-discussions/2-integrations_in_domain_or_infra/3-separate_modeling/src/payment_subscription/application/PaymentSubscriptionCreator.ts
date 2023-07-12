import { PaymentSubscription } from "../domain/PaymentSubscription";
import { PaymentSubscriptionRepository } from "../domain/PaymentSubscriptionRepository";

export class PaymentSubscriptionCreator {
	constructor(private readonly repository: PaymentSubscriptionRepository) {}

	async create(
		id?: string,
		productId?: string,
		token?: string,
		email?: string,
		name?: string
	): Promise<void> {
		const userName = token !== undefined ? this.extractNameFromToken(token) : name!;
		const goodId = id !== undefined ? id : productId!;

		const subscription = new PaymentSubscription(goodId, email!, userName, token);

		await this.repository.create(subscription);
	}

	private extractNameFromToken(token: string): string {
		return token[0];
	}
}
