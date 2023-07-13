import { StripeSubscription } from "./StripeSubscription";

export interface StripeSubscriptionRepository {
	create(subscription: StripeSubscription): Promise<void>;

	delete(subscription: StripeSubscription): Promise<void>;
}
