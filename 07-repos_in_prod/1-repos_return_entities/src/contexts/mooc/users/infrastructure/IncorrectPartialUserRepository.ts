// noinspection UnnecessaryLocalVariableJS

import { Service } from "diod";

import { PostgresRepository } from "../../../shared/infrastructure/postgres/PostgresRepository";
import { User } from "../domain/User";
import { UserId } from "../domain/UserId";

type PartialUserEmail = {
	id: string;
	email: string;
};

@Service()
export class IncorrectPartialUserRepository extends PostgresRepository<User> {
	async findUserEmails(): Promise<PartialUserEmail[]> {
		const rows = await this.execute`
			SELECT id, email
			FROM mooc.users;
		`;

		return rows as PartialUserEmail[];
	}

	async updateEmailMassively(
		userIds: UserId[],
		newEmail: string,
	): Promise<void> {
		const ids = userIds.map((id) => id.value);

		await this.execute`
			UPDATE mooc.users
			SET email = ${newEmail}
			WHERE id = ANY(${ids});
		`;
	}

	protected toAggregate(): User {
		throw new Error("Not implemented");
	}
}
