import express from 'express';
import {
  getAllUsers, signup, getSpecificUser, updateSpecificUser, deleteSpecificUser
} from '../controller/users';

const users = express.Router();

users.post('/signup', signup);

users.get('/users', getAllUsers);

users.get('/user/:id', getSpecificUser);

users.patch('/user/:id', updateSpecificUser);

users.delete('/user/:id', deleteSpecificUser);

export default users;
