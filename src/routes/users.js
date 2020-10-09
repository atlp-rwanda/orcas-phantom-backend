import express from 'express';
import {
  getAllUsers, signup, login, getSpecificUser, updateSpecificUser, deleteSpecificUser
} from '../controllers/users';
import { userSignupInput, userUpdateInput, userLoginInput } from '../middleware/user.validation';
import verifyAdminToken from '../middleware/verifyAuthToken';

const users = express.Router();

users.post('/signup', [verifyAdminToken, userSignupInput], signup);

users.post('/login', [userLoginInput], login);

users.get('/users', getAllUsers);

users.get('/user/:id', getSpecificUser);

users.patch('/user/:id', [userUpdateInput], updateSpecificUser);

users.delete('/user/:id', deleteSpecificUser);

export default users;
