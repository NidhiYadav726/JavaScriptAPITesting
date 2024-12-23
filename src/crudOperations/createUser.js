const apiClient = require('../utils/apiClient');
const { getToken } = require('../utils/tokenManagement');

const createUser = async (userData) => {
  const response = await apiClient
    .post('/users')
    .set('Authorization', `Bearer ${getToken()}`)
    .send(userData);
  return response;
};

module.exports = createUser;
