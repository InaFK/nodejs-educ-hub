import { IncomingMessage, ServerResponse } from 'http';
// import { v4 as uuidv4, validate as isUUID } from 'uuid';
// import { getUsers, getUser, createUser, updateUser, deleteUser } from '../database/userDatabase';
import { getUsers } from '../database/userDatabase';


export const handleGetUsers = (req: IncomingMessage, res: ServerResponse) => {
  const users = getUsers();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

// Additional CRUD controller functions omitted for brevity
