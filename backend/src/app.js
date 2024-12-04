require('dotenv').config();

const express = require('express');
const cors = require('cors');

const yongRoutes = require('./routes/yong.routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', yongRoutes);

app.use(errorMiddleware);

module.exports = app;
