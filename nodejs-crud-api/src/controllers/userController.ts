import { v4 as uuidv4 } from 'uuid';
import { User, users } from '../models/userModel';

export const getUsers = () => users;

export const getUserById = (id: string) => users.find(user => user.id === id);

export const createUser = (username: string, age: number, hobbies: string[]) => {
    const newUser: User = { id: uuidv4(), username, age, hobbies };
    users.push(newUser);
    return newUser;
};

export const updateUser = (id: string, username: string, age: number, hobbies: string[]) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users[index] = { id, username, age, hobbies };
        return users[index];
    }
    return null;
};

export const deleteUser = (id: string) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};
