const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

function connectToDatabase() {
  mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
      console.log('Successfully connected to the database');
    })
    .catch((error) => {
      console.error('Error connecting to the database:', error);
    });
}

module.exports = connectToDatabase;
