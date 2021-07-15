const { PORT = 3000 } = process.env;
const DB_ADDRESS = 'mongodb://localhost:27017/bitfilmsdb';

const SALT_ROUNDS = 10;

module.exports = { PORT, DB_ADDRESS, SALT_ROUNDS };
