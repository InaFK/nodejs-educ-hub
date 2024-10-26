import { User } from '../types/userTypes';

const users: User[] = [];

export const getUsers = () => users;
export const getUser = (id: string) => users.find(user => user.id === id);
// Additional CRUD database functions omitted for brevity
