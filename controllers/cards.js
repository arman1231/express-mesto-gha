/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate('user')
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// eslint-disable-next-line no-unused-vars
module.exports.createCard = (req, res) => {
  console.log(req.user._id); // _id станет доступен
};
// module.exports.createCard = (req, res) => {
//   const { name, link } = req.body;

//   Card.create({ name, link, owner: userId, likes: [], })
// };
