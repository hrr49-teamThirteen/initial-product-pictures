require('babel-polyfill');
const db = require('./database/index.js');
var express = require('express');
var app = require('./app.js');
const supertest = require('supertest');
const http = require('http');


let request;
let server;

beforeAll(() => {
  server = http.createServer(app.app);
  server.listen();
  request = supertest(server);
});

afterAll(()=> {
  server.close();
  db.connection.end();
});

describe('Testing Paths', () => {
  it('should respond to a GET request at ______', async () => {
    let response = await request.get('/api/products');
    expect(response.statusCode).toBe(200);
  });
});

// describe('Sanity test', () => {
//   it('should be equal', () => {
//     let sum = 2 + 2;
//     expect(sum).toBe(4);
//   });
// });
