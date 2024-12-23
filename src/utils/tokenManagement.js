require('dotenv').config();

const getToken = () => {
  return process.env.ACCESS_TOKEN;
};

module.exports = { getToken };
