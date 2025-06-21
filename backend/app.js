const dotenv = require('dotenv');
dotenv.config();
const userRoutes = require('./routes/user.route');
const cookieParser = require('cookie-parser');
const captainRoutes = require('./routes/captain.route');
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./db/db');
connectToDatabase(); // This will clearly show it’s a function

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!'); });

app.use('/users',userRoutes)
app.use('/captains', captainRoutes);

module.exports = app;
