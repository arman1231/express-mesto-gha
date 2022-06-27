/* eslint-disable quote-props */
const User = require('../models/user');
const { ERROR_BAD_REQUEST, ERROR_NOT_FOUND, ERROR_INTERNAL_SERVER_ERROR } = require('../utils/errorCodes');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.find({ _id: userId })
    .then((user) => {
      if (!user) {
        res.status(ERROR_NOT_FOUND).send({ message: `${userId} not found` });
      } else {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: err });
      } else {
        res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: err });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const { name, about } = req.body;
  User.updateOne(
    // eslint-disable-next-line no-underscore-dangle
    { _id: req.user._id },
    {
      $set: { name, about },
    },
  )
    .then((user) => {
      if (!user) {
        // eslint-disable-next-line no-underscore-dangle
        res.status(ERROR_NOT_FOUND).send({ message: `${req.user._id} not found` });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.updateOne(
    // eslint-disable-next-line no-underscore-dangle
    { _id: req.user._id },
    {
      $set: { avatar },
    },
  )
    .then((user) => {
      if (!user) {
        // eslint-disable-next-line no-underscore-dangle
        res.status(ERROR_NOT_FOUND).send({ message: `${req.user._id} not found` });
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_BAD_REQUEST).send({ message: err.message });
      } else {
        res.status(ERROR_INTERNAL_SERVER_ERROR).send({ message: err.message });
      }
    });
};
