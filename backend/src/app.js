const express = require('express');
const userRoutes = require('./routes/chat.routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

app.use(errorMiddleware);

module.exports = app;
