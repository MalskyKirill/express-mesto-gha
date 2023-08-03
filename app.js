const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usersRouter = require('./routs/users');
const cardsRouter = require('./routs/cards');

const PORT = 3000;

// подключение к бд
mongoose
  .connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('подключение к бд');
  });

const app = express(); // создаем обьект приложения

app.use(bodyParser.json());

// захардкодили id пользователя мидлвареной
app.use((req, res, next) => {
  req.user = {
    _id: '64ca6f72e3f24b1d8204cdde',
  };

  next();
});

// роуты
app.use(usersRouter);
app.use(cardsRouter);

// начинаем прослушивать подключение на PORT
app.listen(PORT, () => {
  console.log('сервер запущен');
});
