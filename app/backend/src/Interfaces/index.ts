export type NewEntity<T> = Omit<T, 'id' | 'inProgress'>;

export type ID = number;

export type Identifiable = { id: ID };
