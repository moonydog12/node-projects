// 環境變數
require('dotenv').config();
require('express-async-errors');

// express
const express = require('express');

const app = express();

// packages
const morgan = require('morgan');

// database
const connectDB = require('./db/connect');

// middleware(會依據順序執行，因此須根據程式邏輯進行排列)
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(morgan('tiny'));
app.use(express.json()); // 事先允許 all routes接收 json 格式資料

app.get('/', (req, res) => {
  res.send('e-commerce API');
});

app.use(notFoundMiddleware); // 處理無效路由
app.use(errorHandlerMiddleware); // 處理路由擲出的錯誤

const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
