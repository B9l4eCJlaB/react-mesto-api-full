const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  JWT_SECRET_DEFAULT,
} = require('../utils/constants');

const ConflictError = require('../errors/conflict-error');
const BadRequetError = require('../errors/bad-request-error');
const NotFound = require('../errors/not-found');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((data) => {
      const user = data.toObject();
      delete user.password;
      res.send(data);
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Такой email уже зарегистрирован'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.qetUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с заданным ID не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с заданным ID не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь с заданным ID не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequetError('Некорректные данные'));
        return;
      }
      if (err.name === 'CastError') {
        next(new BadRequetError('Некорректный ID'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : JWT_SECRET_DEFAULT, { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      next(err);
    });
};
