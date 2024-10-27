import request from 'supertest';
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


describe('GET /api/users/:userId', () => {
    it('should return 200 and the user data for a valid userId', async () => {
      const validUser = { id: '550e8400-e29b-41d4-a716-446655440000', username: 'testUser1', age: 25, hobbies: ['reading', 'gaming'] };
      users.push(validUser);
  
      const response = await request(server).get(`/api/users/${validUser.id}`);
      expect(response.status).toBe(200);
      expect(response.body).toEqual(validUser);
    });
  
    it('should return 400 for an invalid UUID', async () => {
      const response = await request(server).get('/api/users/invalid-id');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ message: 'Invalid user ID format' });
    });
  
    it('should return 404 if userId does not exist', async () => {
      const nonExistentId = '550e8400-e29b-41d4-a716-446655440001';
      const response = await request(server).get(`/api/users/${nonExistentId}`);
      expect(response.status).toBe(404);
      expect(response.body).toEqual({ message: 'User not found' });
    });
  });