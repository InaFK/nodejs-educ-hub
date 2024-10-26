import http from 'http';
import { handleRequest } from './routes/userRoutes';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT || 3000;

export const createServer = () => {
  const server = http.createServer((req, res) => {
    handleRequest(req, res);
  });

  server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

  return server;
};

createServer();

