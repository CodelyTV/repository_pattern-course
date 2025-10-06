import { Service } from "diod";

import { EventBus } from "../../../../shared/domain/event/EventBus";
import { UserId } from "../../../users/domain/UserId";
import { CourseSuggestionsGeneratorGateway } from "../../domain/CourseSuggestionsGeneratorGateway";
import { UserCourseSuggestions } from "../../domain/UserCourseSuggestions";
import { UserCourseSuggestionsRepository } from "../../domain/UserCourseSuggestionsRepository";

@Service()
export class UserCourseSuggestionsGenerator {
	constructor(
		private readonly repository: UserCourseSuggestionsRepository,
		private readonly generator: CourseSuggestionsGeneratorGateway,
		private readonly eventBus: EventBus,
	) {}

	async generate(userId: string, courseId: string): Promise<void> {
		const userCourseSuggestions =
			(await this.repository.search(new UserId(userId))) ??
			UserCourseSuggestions.create(userId);

		if (!userCourseSuggestions.hasCompleted(courseId)) {
			userCourseSuggestions.addCompletedCourse(courseId);

			const suggestions = await this.generator.generate(
				userCourseSuggestions,
			);

			userCourseSuggestions.updateSuggestions(suggestions);

			await this.repository.save(userCourseSuggestions);
			await this.eventBus.publish(
				userCourseSuggestions.pullDomainEvents(),
			);
		}
	}
}
