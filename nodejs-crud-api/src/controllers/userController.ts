import { ServerResponse } from 'http';
import { validate as isUUID } from 'uuid';
// import { getUsers, getUser, createUser, updateUser, deleteUser } from '../database/userDatabase';
import { getUsers, getUser } from '../database/userDatabase';

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
