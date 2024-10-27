import { ServerResponse } from 'http';
import { validate as isUUID, v4 as uuidv4 } from 'uuid';
import { getUsers, getUser } from '../database/userDatabase';
import { User } from '../types/userTypes';

const users: User[] = [];

export const getAllUsers = (res: ServerResponse) => {
  const users = getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export const getUserById = (userId: string, res: ServerResponse) => {
  if (!isUUID(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Invalid user ID format' }));
    return;
  }
  
  const user = getUser(userId);
  
  if (user) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(user));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
  }
};

export const createUser = async (userData: Partial<User>, res: ServerResponse) => {
  const { username, age, hobbies } = userData;

  if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Request body must include username, age (number), and hobbies (array).' }));
    return;
  }

  const newUser: User = {
    id: uuidv4(),
    username,
    age,
    hobbies
  };

  users.push(newUser);

  res.writeHead(201, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(newUser));
};
