const supertest = require('supertest');
const BASE_URL = 'https://gorest.co.in/public/v2';

const apiClient = supertest(BASE_URL);

module.exports = apiClient;
