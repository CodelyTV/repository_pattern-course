export interface DAO<T> {
	save(entity: T): Promise<void>;

	update(entity: T, params: Map<string, string>): Promise<void>;

	search(id: string): Promise<T | null>;

	delete(entity: T): Promise<void>;
}
