const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { ERROR_NOT_FOUND } = require('./utils/errorCodes');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const { validateCreateUser, validateLogin } = require('./middlewares/validation');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('OK');
});
// app.use((req, res, next) => {
//   req.user = {
//     _id: '62ac37b14bc6d8d2d29a36dc',
//   };
//   next();
// });
app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.use(auth);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Page does not exist' });
});
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
