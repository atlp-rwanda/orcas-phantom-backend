import express from 'express';
import {
  getAllUsers, signup, getSpecificUser, updateSpecificUser, deleteSpecificUser
} from '../controllers/users';
import { userSignupInput, userUpdateInput } from '../middleware/user.validation';

const users = express.Router();

users.post('/signup', [userSignupInput], signup);

users.get('/users', getAllUsers);

users.get('/user/:id', getSpecificUser);

users.patch('/user/:id', [userUpdateInput], updateSpecificUser);

users.delete('/user/:id', deleteSpecificUser);

export default users;
