import { Either } from "../../shared/domain/Either";
import { User } from "./User";
import { UserAlreadyExist } from "./UserAlreadyExist";
import { UserDoesNotExistError } from "./UserDoesNotExistError";
import { UserId } from "./UserId";

export interface UserWithErrorsRepository {
	save(user: User): Promise<Either<never, UserAlreadyExist>>;

	search(id: UserId): Promise<User | null>;

	find(id: UserId): Promise<Either<User, UserDoesNotExistError>>;
}
