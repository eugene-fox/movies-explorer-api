const { PORT = 3000 } = process.env;
const DB_ADDRESS = 'mongodb://localhost:27017/movies-explorer-db';

module.exports = { PORT, DB_ADDRESS };
