const Card = require('../models/card');
const BadRequetError = require('../errors/bad-request-error');
const NotFound = require('../errors/not-found');
const Forbidden = require('../errors/forbidden');

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка по указанному ID не найдена');
      }
      if (req.user._id.toString() !== card.owner.toString()) {
        throw new Forbidden('Невозможно удалить чужую карочку');
      }
      return card.remove()
        .then(() => res.send({ message: 'Карточка удалена', data: card }));
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};

module.exports.addLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка по указанному ID не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};

module.exports.deleteLikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFound('Карточка по указанному ID не найдена');
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};
