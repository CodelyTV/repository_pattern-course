import { PaymentSubscription } from "./PaymentSubscription";

export interface PaymentSubscriptionRepository {
	create(subscription: PaymentSubscription): Promise<void>;

	delete(subscription: PaymentSubscription): Promise<void>;
}
