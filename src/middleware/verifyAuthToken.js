import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../database/models';

dotenv.config();

const verifyAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    res.status(401).json({
      status: 401,
      message: 'You are not authorized to use this resource'
    });
    return;
  }
  const token = authHeader;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorized to complete this task',
        err
      });
    }

    req.authUser = decodedToken;

    const { role } = req.authUser;
    const { email } = req.authUser;

    if (role != 'admin') {
      res.status(401).send({
        status: 401,
        message: 'You do not have a permission to perform this action'
      });
    }
    models.User.findOne({ where: { email } })
      .then((availableEmail) => {
        if (!availableEmail) {
          return res.status(404).json(
            {
              status: 404,
              message: 'You are not authorized to use this resource'
            }
          );
        }

        next();
      })
      .catch(() => res.status(500).json(
        { status: 500, message: 'Oops, something went wrong.' }
      ));
  });
};
const verifyActivateToken = (req, res, next) => {
  const authBody = req.body;
  if (typeof authBody === 'undefined') {
    res.status(401).json({
      status: 401,
      message: 'You are not authorized to use this resource'
    });
    return;
  }
  const token = authHeader;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorized to complete this task',
        err
      });
    }

    req.authUser = decodedToken;

    const { role } = req.authUser;
    const { email } = req.authUser;

    if (role != 'admin') {
      res.status(401).send({
        status: 401,
        message: 'You do not have a permission to perform this action'
      });
    }
    models.User.findOne({ where: { email } })
      .then((availableEmail) => {
        if (!availableEmail) {
          return res.status(404).json(
            {
              status: 404,
              message: 'You are not authorized to use this resource'
            }
          );
        }

        next();
      })
      .catch(() => res.status(500).json(
        { status: 500, message: 'Oops, something went wrong.' }
      ));
  });
};
const verifyUserToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (typeof authHeader === 'undefined') {
    res.status(401).json({
      status: 401,
      message: 'You are not authorized to use this resource'
    });
    return;
  }
  const token = authHeader;

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({
        status: 401,
        message: 'You are not authorized to complete this task',
        err
      });
    }

    req.authUser = decodedToken;

    const { email } = req.authUser;

    models.User.findOne({ where: { email } })
      .then((availableEmail) => {
        if (!availableEmail) {
          return res.status(404).json(
            {
              status: 404,
              message: 'You are not authorized to use this resource'
            }
          );
        }

        next();
      })
      .catch(() => res.status(500).json(
        { status: 500, message: 'Oops, something went wrong.' }
      ));
  });
};

export { verifyAdminToken, verifyUserToken, verifyActivateToken };
