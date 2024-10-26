import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById } from '../controllers/userController';
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
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
};
