import http from 'http';
import { handleRequest } from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 4000;

export function createServer() {
  return http.createServer(handleRequest);
}

if (process.env.NODE_ENV !== 'test') {
  const server = createServer();
  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

createServer();
