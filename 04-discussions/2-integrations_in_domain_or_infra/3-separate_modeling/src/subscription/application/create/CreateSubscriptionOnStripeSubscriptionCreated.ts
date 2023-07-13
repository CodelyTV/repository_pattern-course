import { PayPalSubscriptionCreated } from "../../../paypal_subscription/domain/PayPalSubscriptionCreated";
import { SubscriptionCreator } from "./SubscriptionCreator";

export class CreateSubscriptionOnStripeSubscriptionCreated {
	constructor(private readonly creator: SubscriptionCreator) {}

	async on(event: PayPalSubscriptionCreated): Promise<void> {
		await this.creator.create(event.id, "paypal");
	}
}
