const cardRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  createCard,
  getCards,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');
const { regExpUrl, regExpId } = require('../utils/constants');

cardRouter.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().required()
      .pattern(regExpUrl),
  }),
}), createCard);

cardRouter.get('/cards', getCards);

cardRouter.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().pattern(regExpId).required(),
  }),
}), deleteCard);

cardRouter.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().pattern(regExpId).required(),
  }),
}), addLikeCard);

cardRouter.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().pattern(regExpId).required(),
  }),
}), deleteLikeCard);

module.exports = { cardRouter };
