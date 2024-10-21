import { IncomingMessage, ServerResponse } from 'http';
import {
    createUser,
    deleteUser,
    getUsers,
    getUserById,
    updateUser,
} from '../controllers/userController';

export const userRoutes = (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    res.setHeader('Content-Type', 'application/json');

    if (method === 'GET' && url === '/api/users') {
        res.writeHead(200);
        res.end(JSON.stringify(getUsers()));
    } else if (method === 'GET' && url?.startsWith('/api/users/')) {
        const userId = url.split('/')[3];
        const user = getUserById(userId);
        if (user) {
            res.writeHead(200);
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else if (method === 'POST' && url === '/api/users') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, age, hobbies } = JSON.parse(body);
            if (!username || !age || !hobbies) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid data' }));
                return;
            }
            const newUser = createUser(username, age, hobbies);
            res.writeHead(201);
            res.end(JSON.stringify(newUser));
        });
    } else if (method === 'PUT' && url?.startsWith('/api/users/')) {
        const userId = url.split('/')[3];
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const { username, age, hobbies } = JSON.parse(body);
            const updatedUser = updateUser(userId, username, age, hobbies);
            if (updatedUser) {
                res.writeHead(200);
                res.end(JSON.stringify(updatedUser));
            } else {
                res.writeHead(404);
                res.end(JSON.stringify({ message: 'User not found' }));
            }
        });
    } else if (method === 'DELETE' && url?.startsWith('/api/users/')) {
        const userId = url.split('/')[3];
        if (deleteUser(userId)) {
            res.writeHead(204);
            res.end();
        } else {
            res.writeHead(404);
            res.end(JSON.stringify({ message: 'User not found' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Endpoint not found' }));
    }
};
