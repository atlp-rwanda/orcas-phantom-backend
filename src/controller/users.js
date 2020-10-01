import User from '../database/models/users';

const signup = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    busId: req.body.busId
  };

  User.create(user)
    .then((data) => {
      res.status(201).json({ status: 201, message: 'User created successfully', data });
    })
    .catch((err) => res.status(500).json({ status: 404, message: err }));
};
const getAllUsers = (req, res) => {
  User.findAll()
    .then((user) => {
      if (user.length < 1) return res.status(404).json({ status: 404, message: 'There are no available users' });

      const allusers = user.sort((a, b) => (new Date(b.updatedAt)).getTime()
        - (new Date(a.updatedAt).getTime()));

      res.status(200).json({ status: 200, data: allusers });
    })
    .catch((err) => res.status(500).json({ status: 404, message: err }));
};
const getSpecificUser = (req, res) => {
  const { id } = req.params;

  User.findByPk(id)
    .then((user) => {
      if (!user) return res.status(404).json({ status: 404, message: 'There are no available user!' });

      res.status(200).json({ status: 200, user });
    })
    .catch((err) => res.status(500).json({ status: 500, message: err }));
};
const updateSpecificUser = (req, res) => {
  const { id } = req.params;

  User.update(req.body, {
    where: { id }
  })
    .then((user) => {
      if (user == 1) return res.status(200).json({ status: 200, message: 'User was updated successfully.' });

      res.status(404).json({ status: 404, message: `Cannot update User with id = ${id}. Maybe User was not found!` });
    })
    .catch((err) => res.status(500).json({ status: 500, message: err }));
};
const deleteSpecificUser = (req, res) => {
  const { id } = req.params;

  User.destroy({
    where: { id }
  })
    .then((user) => {
      if (user == 1) return res.status(200).json({ status: 200, message: 'User was deleted successfully.' });

      res.status(404).json({ status: 404, message: `Cannot delete User with id = ${id}. Maybe User was not found!` });
    })
    .catch((err) => res.status(500).json({ status: 500, message: err }));
};

export {
  getAllUsers, signup, getSpecificUser, updateSpecificUser, deleteSpecificUser
};
