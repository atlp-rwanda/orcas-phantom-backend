import models from '../database/models';
import { encryptPassword } from '../helper/hashedPassword';

const signup = (req, res) => {
  let { password } = req.body;

  password = encryptPassword(password);
  const user = {
    email: req.body.email,
    password,
    role: req.body.role,
    busId: req.body.busId
  };
  models.User.findOne({ where: { email: req.body.email } })
    .then((emailFound) => {
      if (emailFound) return res.status(409).json({ message: 'Email address already taken' });
      models.User.create(user)
        .then((data) => {
          res.status(201).json({ status: 201, message: 'User created successfully', data });
        })

        .catch(() => res.status(500).json({ status: 500, message: 'server error!' }));
    });
};
const getAllUsers = (req, res) => {
  models.User.findAll()
    .then((user) => {
      if (user.length < 1) return res.status(404).json({ status: 404, message: 'There are no available users' });

      const allusers = user.sort((a, b) => (new Date(b.updatedAt)).getTime()
        - (new Date(a.updatedAt).getTime()));

      res.status(200).json({ status: 200, data: allusers });
    })
    .catch(() => res.status(500).json({ status: 500, message: 'server error!' }));
};
const getSpecificUser = (req, res) => {
  const { id } = req.params;

  models.User.findByPk(id)
    .then((user) => {
      if (!user) return res.status(404).json({ status: 404, message: 'There is no available user!' });

      res.status(200).json({ status: 200, user });
    })
    .catch(() => res.status(500).json({ status: 500, message: 'server error, check whether id is string!' }));
};
const updateSpecificUser = (req, res) => {
  const { id } = req.params;

  let { password } = req.body;

  password = encryptPassword(password);
  const updateUser = {
    email: req.body.email,
    password,
    role: req.body.role,
    busId: req.body.busId
  };

  models.User.update(updateUser, {
    where: { id }
  })
    .then((user) => {
      if (user == 1) return res.status(200).json({ status: 200, message: 'User was updated successfully.' });

      res.status(404).json({ status: 404, message: `Cannot update User with id = ${id} who is not found!` });
    })
    .catch(() => res.status(500).json({ status: 500, message: 'server error, check whether id is string!' }));
};
const deleteSpecificUser = (req, res) => {
  const { id } = req.params;

  models.User.destroy({
    where: { id }
  })
    .then((user) => {
      if (user == 1) return res.status(200).json({ status: 200, message: 'User was deleted successfully.' });

      res.status(404).json({ status: 404, message: `Cannot delete User with id = ${id}, who is not found!` });
    })
    .catch(() => res.status(500).json({ status: 500, message: 'server error, check whether id is string!' }));
};

export {
  getAllUsers, signup, getSpecificUser, updateSpecificUser, deleteSpecificUser
};
