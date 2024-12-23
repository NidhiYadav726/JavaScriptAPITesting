const apiClient = require('../utils/apiClient');
const { getToken } = require('../utils/tokenManagement');

const getUser = async (userId) => {
  const response = await apiClient
    .get(`/users/${userId}`)
    .set('Authorization', `Bearer ${getToken()}`);
  return response;
};

module.exports = getUser;
