import { request } from 'http';
import { createServer } from '../server';

let server: ReturnType<typeof createServer>;

beforeAll(() => {
  server = createServer();
});

afterAll(() => {
  server.close();
});

describe('User API Tests', () => {
  test('GET /api/users should return an empty array', (done) => {
    request(`http://localhost:${process.env.PORT}/api/users`, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        expect(JSON.parse(data)).toStrictEqual([]);
        done();
      });
    }).end();
  });

  test('POST /api/users should create a new user', (done) => {
    const userData = JSON.stringify({
      username: 'John Doe',
      age: 30,
      hobbies: ['reading'],
    });
    const options = {
      hostname: 'localhost',
      port: process.env.PORT,
      path: '/api/users',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': userData.length,
      },
    };

    const req = request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        const user = JSON.parse(data);
        expect(user).toMatchObject({ username: 'John Doe', age: 30, hobbies: ['reading'] });
        done();
      });
    });

    req.write(userData);
    req.end();
  });

  // Additional tests for GET by ID, PUT, DELETE...
});
