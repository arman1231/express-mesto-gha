const express = require('express');
require('dotenv').config();
const cors = require('cors');

const options = {
  origin: [
    'localhost:3000',
    'http://localhost:3000',
    'http://api.addressless.nomoredomains.xyz',
    'https://api.addressless.nomoredomains.xyz',
    'http://addressless.nomoredomains.xyz',
    'https://addressless.nomoredomains.xyz',
    'https://arman1231.github.io',
    'http://mesto.cherkharov.com',
    'https://mesto.cherkharov.com',
  ],
  credentials: true, // эта опция позволяет устанавливать куки
};

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/not-found-err');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3001 } = process.env;
const app = express();
app.use('*', cors(options));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cookieParser());
app.use(requestLogger);
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will fall NOW');
  }, 0);
});
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use('*', auth, (req, res, next) => {
  next(new NotFoundError('Page not found'));
});
app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Internal Server Error'
        : message,
    });
  next();
});
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
