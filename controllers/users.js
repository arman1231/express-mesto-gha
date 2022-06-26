/* eslint-disable quote-props */
const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.getUser = (req, res) => {
  const { userId } = req.params;
  User.find({ _id: userId })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(201).send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
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
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(500).send({ message: err.message }));
};
