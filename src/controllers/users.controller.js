import lodash from 'lodash';
import jwt from 'jsonwebtoken';
import models from '../database/models';
import sendTemplatedMail from '../helper/sendEmail';
import { encryptPassword, decryptPassword } from '../helper/hashedPassword';
import { generateToken, ActivationToken } from '../helper/generateAuthToken';

const signup = (req, res) => {
  let { password } = req.body;

  password = encryptPassword(password);
  const user = {
    email: req.body.email,
    password,
    role: req.body.role,
    busId: req.body.busId,
  };
  const bid = req.body.busId;
  models.Bus.findByPk(req.body.busId).then((bus) => {
    if (!bus) {
      return res.status(404).json({
        status: 404,
        message: `The bus with ID ${bid} is not found`,
      });
    }
    models.User.findOne({ where: { email: req.body.email } }).then(
      (emailFound) => {
        if (emailFound) {
          return res
            .status(409)
            .json({ status: 409, message: 'Email address already taken' });
        }

        models.User.create(user)
          .then((data) => {
            const userData = {
              userInfo: lodash.pick(data, 'busId', 'email', 'role'),
            };
            res.status(201).json({
              status: 201,
              message: 'User created successfully',
              userData,
            });
          })
          .catch(() => res.status(500).json({
            status: 500, message: 'server error!'
          }));
      }
    );
  });
};
const login = (req, res) => {
  const { email, password } = req.body;
  models.User.findOne({ where: { email } })
    .then((emailFound) => {
      if (!emailFound) {
        return res
          .status(404)
          .send({
            status: 404,
            message: 'No associated account with this email',
          });
      }

      const isPasswordValid = decryptPassword(password, emailFound.password);
      if (!isPasswordValid) {
        return res
          .status(404)
          .json({ status: 404, message: 'Incorrect password!' });
      }

      const token = generateToken(
        emailFound.id,
        emailFound.role,
        emailFound.email
      );

      res
        .status(200)
        .json({ status: 200, message: 'login successfull', token });
    })
    .catch(() => res.status(500).json({
      status: 500, message: 'server error!'
    }));
};

const forgetPassword = (req, res) => {
  const { email } = req.body;
  models.User.findOne({ where: { email } }).then((emailFound) => {
    if (!emailFound) {
      return res.status(404).send({
        status: 404,
        message: 'No associated account with this email',
      });
    }
    const token = ActivationToken(
      emailFound.id,
      emailFound.role,
      emailFound.email,
      emailFound.busId
    );
    const data = {
      ...emailFound.dataValues,
      url: `${process.env.CLIENT_URL}/reset-password/${token}`,
    };
    sendTemplatedMail('forgotPassword', [data]);
    return res.status(200).json({
      status: 200,
      message: 'Email sent, Please check your inbox',
    });
  });
};

const getAllUsers = (req, res) => {
  models.User.findAll()
    .then((user) => {
      const allusers = user.sort(
        (a, b) => new Date(b.updatedAt).getTime()
        - new Date(a.updatedAt).getTime()
      );

      const userInfo = lodash.map(
        allusers,
        lodash.partialRight(lodash.pick, [
          'id',
          'email',
          'role',
          'busId',
          'createdAt',
          'updatedAt',
        ])
      );

      res.status(200).json({ status: 200, data: userInfo });
    })
    .catch(() => res.status(500).json({
      status: 500, message: 'server error!'
    }));
};
const getSpecificUser = (req, res) => {
  const { id } = req.params;

  models.User.findByPk(id)
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .json({ status: 404, message: 'There is no available user!' });
      }
      const userInfo = lodash.pick(user, 'id', 'busId', 'email', 'role');

      res.status(200).json({ status: 200, userInfo });
    })
    .catch(() => res
      .status(500)
      .json({
        status: 500,
        message: 'server error, check whether id is string!',
      }));
};
const updateSpecificUser = (req, res) => {
  const { id } = req.params;

  models.User.findByPk(id).then((availableUser) => {
    if (!availableUser) {
      return res
        .status(404)
        .json({ status: 404, message: 'There is no available user!' });
    }

    let { email } = req.body;

    if (!email) {
      email = availableUser.email;
    }

    let { password } = req.body;

    if (!password) {
      password = availableUser.password;
    }

    let { role } = req.body;

    if (!role) {
      role = availableUser.role;
    }

    let { busId } = req.body;

    if (!busId) {
      busId = availableUser.busId;
    }

    password = encryptPassword(password);
    const updateUser = {
      email,
      password,
      role,
      busId,
    };

    models.User.findOne({
      where: { email: req.body.email || 'no email' },
    }).then((emailFound) => {
      if (emailFound) {
        return res
          .status(409)
          .json({ status: 409, message: 'Email address already taken' });
      }

      models.User.update(updateUser, {
        where: { id },
      })
        .then((user) => {
          if (user == 1) {
            return res
              .status(200)
              .json({ status: 200, message: 'User was updated successfully.' });
          }
        })

        .catch(() => res.status(500).json({
          status: 500, message: 'server error!'
        }));
    });
  });
};
const resetPassword = (req, res) => {
  const { token, newPassword } = req.body;
  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          status: 401,
          message: 'You are not authorized to complete this task',
          err
        });
      }
      const updateUser = {
        email: decodedToken.email,
        password: encryptPassword(newPassword),
        role: decodedToken.role,
        busId: decodedToken.busId,
      };
      models.User.update(updateUser, {
        where: { id: decodedToken.id },
      });
      return res
        .status(200)
        .json({
          status: 200,
          message: 'password was updated successfully.'
        });
    });
  }
};
const deleteSpecificUser = (req, res) => {
  const { id } = req.params;

  models.User.destroy({
    where: { id },
  })
    .then((user) => {
      if (user == 1) {
        return res
          .status(200)
          .json({ status: 200, message: 'User was deleted successfully.' });
      }

      res.status(404).json({
        status: 404,
        message: `Cannot delete User with id = ${id}, who is not found!`,
      });
    })
    .catch(() => res
      .status(500)
      .json({
        status: 500,
        message: 'server error, check whether id is string!',
      }));
};

export {
  getAllUsers,
  signup,
  login,
  getSpecificUser,
  updateSpecificUser,
  deleteSpecificUser,
  forgetPassword,
  resetPassword
};
