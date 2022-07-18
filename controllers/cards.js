/* eslint-disable no-underscore-dangle */
const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

// eslint-disable-next-line no-unused-vars
module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({
    name, link, owner: req.user._id, likes: [],
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Wrong input data'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Card is not found');
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Not authorized to remove');
      } else {
        Card.remove({ _id: cardId })
          .then((specificCard) => {
            if (!specificCard) {
              throw new NotFoundError('Card is not found');
            } else {
              res.send({ message: 'Card deleted' });
            }
          })
          .catch((specificCardErr) => {
            if (specificCardErr.name === 'CastError') {
              next(new BadRequestError('Wrong input data'));
            } else {
              next(specificCardErr);
            }
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Wrong input data'));
      } else {
        next(err);
      }
    });
};

// eslint-disable-next-line no-unused-vars
module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`${req.params.cardId} not found`);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Wrong input data'));
      } else {
        next(err);
      }
    });
};

// eslint-disable-next-line no-unused-vars
module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`${req.params.cardId} not found`);
      } else {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Wrong input data'));
      } else {
        next(err);
      }
    });
};
