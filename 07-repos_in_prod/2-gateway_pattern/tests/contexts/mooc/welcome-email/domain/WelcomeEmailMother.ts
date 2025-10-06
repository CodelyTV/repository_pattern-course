import { faker } from "@faker-js/faker";

import { WelcomeEmail } from "../../../../../src/contexts/mooc/welcome-email/domain/WelcomeEmail";

export class WelcomeEmailMother {
	static create(params?: { name?: string; email?: string }): WelcomeEmail {
		return WelcomeEmail.create(
			params?.name ?? faker.person.fullName(),
			params?.email ?? faker.internet.email(),
		);
	}
}
