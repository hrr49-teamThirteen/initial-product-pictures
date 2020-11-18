var express = require('express');
var app = require('./app.js');
const supertest = require('supertest');

let test = supertest(app);

// describe('Testing Paths', () => {
//   it('should respond to a GET request at ______', async () => {
//     let response = await request.get('/api/initialview');
//     expect(response.statusCode).toBe(200);
//   });
// });

describe('Sanity test', () => {
  it('should be equal', () => {
    let sum = 2 + 2;
    expect(sum).toBe(4);
  });
});

