import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id, role, email) => {
  const token = jwt.sign(
    { id, role, email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: '1d' },
  );

  return token;
};

export default generateToken;
