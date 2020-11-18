import express from 'express';
import {
  getAllUsers,
  signup,
  login, getSpecificUser, updateSpecificUser, deleteSpecificUser,
  forgetPassword, resetPassword
} from '../controllers/users.controller';
import {
  userSignupInput, userUpdateInput, userLoginInput, userEmailInput,
  userResetInput
} from '../middleware/user.validation';
import { verifyAdminToken } from '../middleware/verifyAuthToken';

const users = express.Router();

users.post('/signup', [verifyAdminToken, userSignupInput], signup);

users.post('/login', [userLoginInput], login);

users.put('/forget-password', [userEmailInput], forgetPassword);

users.put('/reset-password', [userResetInput], resetPassword);

users.get('/users', [verifyAdminToken], getAllUsers);

users.get('/users/:id', [verifyAdminToken], getSpecificUser);

users.patch('/users/:id',
  [verifyAdminToken, userUpdateInput], updateSpecificUser);

users.delete('/users/:id', [verifyAdminToken], deleteSpecificUser);

export default users;
