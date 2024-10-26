import { IncomingMessage } from 'http';

export const extractIdFromUrl = (url: string): string | null => {
  const match = url.match(/\/api\/users\/([a-zA-Z0-9-]+)/);
  return match ? match[1] : null;
};

export const parseRequestBody = async (req: IncomingMessage): Promise<any> => {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      resolve(JSON.parse(body));
    });
    req.on('error', err => reject(err));
  });
};
