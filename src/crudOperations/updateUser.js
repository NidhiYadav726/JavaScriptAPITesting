const apiClient = require('../utils/apiClient');
const { getToken } = require('../utils/tokenManagement');

const updateUser = async (userId, updatedData) => {
  const response = await apiClient
    .put(`/users/${userId}`)
    .set('Authorization', `Bearer ${getToken()}`)
    .send(updatedData);
  return response;
};

module.exports = updateUser;
