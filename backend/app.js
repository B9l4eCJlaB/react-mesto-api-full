require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { userRouter } = require('./routes/users');
const { cardRouter } = require('./routes/cards');
const auth = require('./middlewares/auth');
const NotFound = require('./errors/not-found');
const { handleError } = require('./middlewares/handleError');
const { cors } = require('./middlewares/cors');
const limiter = require('./utils/limiter');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();

app.use(cors);
app.use(limiter);

app.use(express.json());

const main = async () => {
  await mongoose.connect('mongodb://localhost:27017/mestodb', {
    useNewUrlParser: true,
  });
  console.log('db connect');
};

main().catch((err) => {
  console.log(err);
});

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(userRouter);
app.use(auth);
app.use(cardRouter);
app.use((req, res, next) => {
  next(new NotFound('Маршрут не найден'));
});

app.use(errorLogger);

app.use(errors());

app.use(handleError);

app.listen(PORT, () => {
  console.log(`app listening on PORT ${PORT}`);
});
