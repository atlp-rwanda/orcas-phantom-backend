import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (id, role, email) => {
  const token = jwt.sign(
    { id, role, email },
    process.env.JWT_PRIVATE_KEY
  );

  return token;
};
const ActivationToken = (id, role, email, busId) => {
  const token = jwt.sign(
    {
      id, role, email, busId
    },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: '60m' }
  );

  return token;
};
export { generateToken, ActivationToken };
