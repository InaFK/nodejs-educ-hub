import { User } from '../types/userTypes';

const users: User[] = [
    { 
        id: '550e8400-e29b-41d4-a716-446655440000',
        username: 'testUser1',
        age: 25,
        hobbies: ['reading', 'gaming'] },
  ];

export const getUsers = () => users;
export const getUser = (id: string) => users.find(user => user.id === id);
// Additional CRUD database functions omitted for brevity
