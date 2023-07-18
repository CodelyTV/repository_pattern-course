import { Subscription } from "./Subscription";

export interface SubscriptionRepository {
	create(subscription: Subscription): Promise<void>;

	delete(subscription: Subscription): Promise<void>;
}
