const userRouter = require('express').Router();

const { celebrate, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const {
  createUser,
  getUsers,
  getUser,
  qetUserById,
  updateProfile,
  updateAvatar,
  login,
} = require('../controllers/users');
const { regExpUrl, regExpId } = require('../utils/constants');

userRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string()
      .pattern(regExpUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);
userRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);
userRouter.get('/users', auth, getUsers);
userRouter.get('/users/me', auth, getUser);
userRouter.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().pattern(regExpId).required(),
  }),
}), auth, qetUserById);
userRouter.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), auth, updateProfile);
userRouter.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required()
      .pattern(regExpUrl),
  }),
}), auth, updateAvatar);

module.exports = { userRouter };
