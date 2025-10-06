import { DomainEvent } from "../../../shared/domain/event/DomainEvent";

type UserEmailChangedDomainEventAttributes = {
	readonly userId: string;
	readonly newEmail: string;
};

export class UserEmailChangedDomainEvent extends DomainEvent {
	static readonly EVENT_NAME = "mooc.user.email_changed";

	readonly userId: string;
	readonly newEmail: string;

	constructor(userId: string, newEmail: string) {
		super(UserEmailChangedDomainEvent.EVENT_NAME, userId);

		this.userId = userId;
		this.newEmail = newEmail;
	}

	toPrimitives(): UserEmailChangedDomainEventAttributes {
		return {
			userId: this.userId,
			newEmail: this.newEmail,
		};
	}
}
