import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { DomainUserFinder } from "../../domain/DomainUserFinder";
import { UserRepository } from "../../domain/UserRepository";

@Service()
export class UserEmailUpdater {
	private readonly finder: DomainUserFinder;

	constructor(
		private readonly repository: UserRepository,
		private readonly eventBus: EventBus,
	) {
		this.finder = new DomainUserFinder(repository);
	}

	async update(userId: string, newEmail: string): Promise<void> {
		const user = await this.finder.find(userId);

		user.changeEmail(newEmail);

		await this.repository.save(user);

		await this.eventBus.publish(user.pullDomainEvents());
	}
}
