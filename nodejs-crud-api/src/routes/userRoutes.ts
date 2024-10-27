import { IncomingMessage, ServerResponse } from 'http';
import { getAllUsers, getUserById, createUser } from '../controllers/userController';
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

      case 'POST':
        const userData = await parseRequestBody(req);
        return await createUser(userData, res);
    }
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Endpoint not found' }));
};

const parseRequestBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(body));
      } catch (error) {
        reject(new Error('Invalid JSON'));
      }
    });
  });
};
