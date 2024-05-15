const express = require('express');
const app = express();

const productRouter = require('./Routes/productRoutes');
const userRouter = require('./Routes/userRoutes');

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/users', userRouter);

module.exports = app;