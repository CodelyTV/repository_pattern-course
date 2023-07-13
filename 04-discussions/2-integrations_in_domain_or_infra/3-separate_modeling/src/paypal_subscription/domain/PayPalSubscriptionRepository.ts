import { PayPalSubscription } from "./PayPalSubscription";

export interface PayPalSubscriptionRepository {
	create(subscription: PayPalSubscription): Promise<void>;

	delete(subscription: PayPalSubscription): Promise<void>;
}
