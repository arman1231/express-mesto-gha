const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { ERROR_NOT_FOUND } = require('./utils/errorCodes');
const { login, createUser } = require('./controllers/users');

const { PORT = 3000 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(cookieParser());
app.get('/', (req, res) => {
  res.send('OK');
});
app.use((req, res, next) => {
  req.user = {
    _id: '62ac37b14bc6d8d2d29a36dc',
  };
  next();
});
app.post('/signin', login);
app.post('signup', createUser);
app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.use((req, res) => {
  res.status(ERROR_NOT_FOUND).send({ message: 'Page does not exist' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
