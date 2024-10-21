import http from 'http';
import { parse } from 'url';
import { userRoutes } from './routes/userRoutes';
import { errorHandler } from './utils/errorHandler';

const PORT = process.env.PORT || 4000;

const server = http.createServer((req, res) => {
    const { pathname } = parse(req.url || '', true);
    if (pathname && pathname.startsWith('/api/users')) {
        userRoutes(req, res);
    } else {
        errorHandler(res, 404, 'Endpoint not found');
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
