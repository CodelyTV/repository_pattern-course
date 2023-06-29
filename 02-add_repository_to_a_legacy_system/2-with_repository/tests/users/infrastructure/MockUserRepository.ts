import { User } from "../../../src/users/domain/User";
import { UserId } from "../../../src/users/domain/UserId";
import { UserRepository } from "../../../src/users/domain/UserRepository";

export class MockUserRepository implements UserRepository {
	private readonly mockSave = jest.fn();
	private readonly mockSearch = jest.fn();

	async save(user: User): Promise<void> {
		expect(this.mockSave).toHaveBeenCalledWith(user);
	}

	async search(id: UserId): Promise<User | null> {
		expect(this.mockSearch).toHaveBeenCalledWith(id);

		return (await Promise.resolve(this.mockSearch())) as Promise<User | null>;
	}

	shouldSave(user: User): void {
		this.mockSave(user);
	}

	shouldSearch(user: User): void {
		this.mockSearch(user.id);
		this.mockSearch.mockReturnValueOnce(user);
	}

	shouldNotSearch(id: UserId): void {
		this.mockSearch(id);
		this.mockSearch.mockReturnValueOnce(null);
	}
}
