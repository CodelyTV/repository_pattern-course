import { CourseSuggestion } from "./CourseSuggestion";
import { UserCourseSuggestions } from "./UserCourseSuggestions";

export abstract class CourseSuggestionsGeneratorGateway {
	abstract generate(
		userCourseSuggestions: UserCourseSuggestions,
	): Promise<CourseSuggestion[]>;
}
