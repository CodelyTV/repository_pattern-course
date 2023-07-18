import { User } from "./User";

export interface UserDAO {
	save(user: User): Promise<void>;

	update(user: User, params: Map<string, string>): Promise<void>;

	search(id: string): Promise<User | null>;

	delete(user: User): Promise<void>;
}
