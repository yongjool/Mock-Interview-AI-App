const express = require('express');
const cors = require('cors');

const userRoutes = require('./routes/chat.routes');
const errorMiddleware = require('./middlewares/errorMiddleware');


const app = express();
app.use(cors());

app.use(express.json());
app.use('/api', userRoutes);

app.use(errorMiddleware);

module.exports = app;
