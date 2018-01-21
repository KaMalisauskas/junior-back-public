const assert = require('assert');
const request = require('supertest');

const app = require('../src/app');

describe('GET /', function() {
    it('respond with json', function() {
      return request(app)
        .get('/')
        .set('Accept', 'application/json')
        .expect(200)
        .then(response => {
            assert(response.body.Welcome, 'To Karolis Api');
        })
    });
  });