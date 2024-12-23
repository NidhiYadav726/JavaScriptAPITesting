const apiClient = require('../utils/apiClient');
const { getToken } = require('../utils/tokenManagement');

const deleteUser = async (userId) => {
  const response = await apiClient
    .delete(`/users/${userId}`)
    .set('Authorization', `Bearer ${getToken()}`);
  return response;
};

module.exports = deleteUser;
