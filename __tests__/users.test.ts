import * as request from 'supertest';
import * as faker from 'faker';
import * as uuid from 'uuid';
import app from '../src/server';
import connection from '../src/db';

describe('User Endpoints', () => {
  let userData = {
    name: '',
    username: '',
    email: '',
  };
  beforeAll(async () => {
    await connection.create();
  });

  afterAll(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    userData = {
      name: faker.name.findName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
    };
    await connection.clear();
  });

  describe('Successful Operations', () => {
    it('should create a user', async () => {
      return request(app)
        .post('/users')
        .send(userData)
        .then((res) => {
          expect(res.status).toEqual(201);
          expect(res.body).toHaveProperty('id');
        });
    });

    it('should create then read a user', async () => {
      await request(app).post('/users').send(userData);
      return request(app)
        .get('/users')
        .then((res) => {
          const storedUser = res.body[0];
          expect(storedUser.name).toBe(userData.name);
          expect(storedUser.email).toBe(userData.email);
          expect(storedUser.username).toBe(userData.username);
        });
    });

    it('should create then update a user', async () => {
      const res = await request(app).post('/users').send(userData);
      return request(app)
        .put(`/users/${res.body.id}`)
        .send({
          name: faker.name.findName(),
          username: faker.internet.userName(),
          email: faker.internet.email(),
        })
        .expect(200);
    });

    it('should create then delete a user', async () => {
      const res = await request(app).post('/users').send(userData);
      return request(app).delete(`/users/${res.body.id}`).expect(200);
    });
  });

  describe('Unsuccessful Operations', () => {
    it('should fail creating a user', async () => {
      return request(app)
        .post('/users')
        .send()
        .then((res) => {
          expect(res.status).toEqual(400);
          expect(res.body).toHaveProperty('message');
          expect(res.body).toHaveProperty('errors');
        });
    });
    it('should fail updating a user', async () => {
      return request(app)
        .put(`/users/${uuid.v4()}`)
        .send(userData)
        .then((res) => {
          expect(res.status).toEqual(404);
          expect(res.body).toHaveProperty('error');
        });
    });
    it('should fail deleating a user', async () => {
      return request(app)
        .delete(`/users/${uuid.v4()}`)
        .then((res) => {
          expect(res.status).toEqual(404);
          expect(res.body).toHaveProperty('error');
        });
    });
  });
});
