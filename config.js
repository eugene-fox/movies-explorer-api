const { PORT = 3000, DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const SALT_ROUNDS = 10;
const JWT_DEV_SECRET = 'dev-secret';

module.exports = {
  PORT,
  DB_ADDRESS,
  SALT_ROUNDS,
  JWT_DEV_SECRET,
};
