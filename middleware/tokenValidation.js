import jwt from 'jsonwebtoken';
import supabase from '../helpers/supabaseClient.js';

const authenticateToken = async (req, res, next) => {
  const token = req.headers['cookie']?.split('=')[1];
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);

    if (error) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};

// const authToken = async (req, res, next) => {
//   const token = req.params.token;
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }
//   try {
//     const { data, error } = await supabase.auth.getUser(token);

//     if (error) {
//       return res.status(401).json({ error: 'Invalid token.' });
//     }

//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: 'Invalid token.' });
//   }
// }

export default
  authenticateToken
;