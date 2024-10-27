import { request } from 'http';
import { createServer } from '../server';
import { users } from '../database/userDatabase';

let server: ReturnType<typeof createServer>;

beforeAll((done) => {
  server = createServer().listen(process.env.PORT || 4000, done);
});

afterAll((done) => {
  server.close(done);
});

beforeEach(() => {
  users.length = 0;
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
  }, 15000);

  // Additional tests for GET by ID, POST, PUT, DELETE...
});
