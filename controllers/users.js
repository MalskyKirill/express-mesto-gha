const UserModel = require('../models/user');

const getUsers = (req, res) => {
  UserModel.find({})
    .then((users) => {
      res.status(200).send({ data: users });
    })
    .catch(() => res.status(500).send('server error'));
};

const getUserById = (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  UserModel.findById(_id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'пользователь не найден' });
      }

      return res.status(200).send(user);
    })
    .catch(() => {
      res.status(500).send('server error');
    });
};

const createUser = (req, res) => {
  UserModel.create({ ...req.body })
    .then((user) => res.status(201).send(user))
    .catch(() => {
      res.status(500).send('server error');
    });
};

const updateUserProfile = (req, res) => {
  const { _id } = req.user;

  const { name, about } = req.body;

  UserModel.findByIdAndUpdate(_id, { name, about })
    .then((newData) => {
      res.status(200).send(newData);
    })
    .catch(() => {
      res.status(500).send('server error');
    });
};

const updateUserAvatar = (req, res) => {
  const { _id } = req.user;

  const { avatar } = req.body;

  UserModel.findByIdAndUpdate(_id, { avatar })
    .then((newData) => {
      res.status(200).send(newData);
    })
    .catch(() => {
      res.status(500).send('server error');
    });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUserProfile,
  updateUserAvatar,
};
