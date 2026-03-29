import jwt from 'jsonwebtoken';
export const Token = (userId) => {
   return jwt.sign(
    { userId}, 
    process.env.JWT_SECRET, 
    { expiresIn: '7d' });
   
};
