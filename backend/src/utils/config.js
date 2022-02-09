const {
  PORT = 3000,
  DB_ADDRESS = 'mongodb://localhost:27017/mestodb',
  JWT_SECRET = 'little-dirty-secret',
} = process.env;

module.exports = {
  PORT,
  DB_ADDRESS,
  JWT_SECRET,

};
