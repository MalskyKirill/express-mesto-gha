const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const usersRouter = require('./routs/users');
const cardsRouter = require('./routs/cards');

const handleError = require('./midlewares/handleError');

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter); // применили промежуточное ПО для ограничения скорости ко всем запросам

app.use(helmet());

app.use(bodyParser.json()); // подключили бодипарсер

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

// роут для всего ненайденого
app.use('*', (req, res) => {
  res.status(404).send({ message: 'Page Not Found' });
});

// мидлварина для обработки ошибок
app.use(handleError);

// начинаем прослушивать подключение на PORT
app.listen(PORT, () => {
  console.log('сервер запущен');
});
