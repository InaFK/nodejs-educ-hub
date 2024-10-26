import { IncomingMessage, ServerResponse } from 'http';
// import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController';
import { getAllUsers, getUserById } from '../controllers/userController';
// import { extractIdFromUrl, parseRequestBody } from '../utils/requestUtils';
import { extractIdFromUrl } from '../utils/requestUtils';

export const handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
  const { method, url } = req;

  if (url?.startsWith('/api/users')) {
    const userId = extractIdFromUrl(url);

    switch (method) {
      case 'GET':
        if (userId) {
          return await getUserById(userId, res);
        }
        return await getAllUsers(res);
      // case 'POST':
      //   const userData = await parseRequestBody(req);
      //   return await createUser(userData, res);
      // case 'PUT':
      //   if (userId) {
      //     const updatedData = await parseRequestBody(req);
      //     return await updateUser(userId, updatedData, res);
      //   }
      // break;
      // case 'DELETE':
      //   if (userId) {
      //     return await deleteUser(userId, res);
      //   }
      // break;
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
};
