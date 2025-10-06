import { Service } from "diod";

import { PostgresConnection } from "../../../shared/infrastructure/postgres/PostgresConnection";

type UserStatisticsDTO = {
	totalUsers: number;
	activeUsers: number;
	inactiveUsers: number;
	averageSuggestedCourses: number;
};

type InactiveUserDTO = {
	id: string;
	name: string;
	email: string;
	lastActivity: Date;
};

@Service()
export class UserReportingRepository {
	constructor(private readonly connection: PostgresConnection) {}

	async searchUserStatistics(): Promise<UserStatisticsDTO> {
		const [result] = await this.connection.execute<{
			total_users: number;
			active_users: number;
			inactive_users: number;
			avg_suggested_courses: number;
		}>`
			SELECT
				COUNT(*) as total_users,
				COUNT(CASE WHEN suggested_courses != '' THEN 1 END) as active_users,
				COUNT(CASE WHEN suggested_courses = '' THEN 1 END) as inactive_users,
				AVG(LENGTH(suggested_courses)) as avg_suggested_courses
			FROM mooc.users;
		`;

		return {
			totalUsers: Number(result.total_users),
			activeUsers: Number(result.active_users),
			inactiveUsers: Number(result.inactive_users),
			averageSuggestedCourses: Number(result.avg_suggested_courses),
		};
	}

	async searchInactiveUsers(): Promise<InactiveUserDTO[]> {
		const rows = await this.connection.execute<{
			id: string;
			name: string;
			email: string;
			created_at: Date;
		}>`
			SELECT id, name, email, created_at as last_activity
			FROM mooc.users
			WHERE suggested_courses = ''
			ORDER BY created_at DESC;
		`;

		return rows.map((row) => ({
			id: row.id,
			name: row.name,
			email: row.email,
			lastActivity: row.created_at,
		}));
	}
}
