import {UserId} from "../domain/UserId";
import {User} from "../domain/User";

export class CourseSearcher {
    constructor(private readonly searchInRepository: (id: UserId) => User | null) {}

    find(id: string): User | null {
        const userId = new UserId(id);

        return this.searchInRepository(userId);
    }
}
