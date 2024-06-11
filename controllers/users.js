import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import supabase from '../helpers/supabaseClient.js';
import { createUser, getUserByEmail } from '../models/users.js';

// Register a new user
const register = async (req, res) => {
  try {
    const { email, password, fullName, company, referral } = req.body;

    // Sign up the user with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            fullName: fullName,
            company: company,
            referral: referral
          },
        },
    })

    if (error) {
        console.log('Error:', error.message);  // Logging
      return res.status(400).json({ error: error.message });
    }

    return res.status(200).json({ data });
  } catch (error) {
    console.log('Catch block error:', error.message);  // Logging
    res.status(500).json({ error: error.message });
  }
};

// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        const token = data.session.access_token;

        res.cookie('token', token, { httpOnly: true });

        return res.status(200).json({ message: 'Logged in successfully', user: data.user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// // Check if email is verified
// const checkEmailVerified = async (req, res) => {
//   const { email } = req.body;
//   const { data, error } = await supabase.auth.api.getUserByEmail(email);

//   if (error) {
//     return res.status(400).json({ error: error.message });
//   }

//   return res.status(200).json({ verified: data.email_confirmed_at !== null });
// };

// // Verify JWT token
// const verifyToken = async (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   const { data: user, error } = await supabase.auth.api.getUser(token);
//   if (error) {
//     return res.status(401).json({ error: error.message });
//   }

//   req.user = user;
//   next();
// };

// Logout a user
const logout = async (req, res) => {
    try {
      res.clearCookie('token');
      const { error } = await supabase.auth.signOut();
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

// Update user's profile
const updateUsersProfile = async (req, res) => {
    try{
        const { id } = req.user;
        const { ...updates } = req.body;
        const { data, error } = await supabase
            .from('profiles')
            .update(updates)
            .eq('id', id);

        if (error) {
            console.log(error);  // Logging
            return res.status(400).json({ error: error.message });
        }

        console.log(data);  // Logging
        return res.status(200).json({ message: 'Profile updated successfully', data });
  
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Handle forgot password OTP
const resetPassword = async (req, res) => {
    try{
        const { email } = req.body;
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'http:localhost:3001/account/update-password',
          })

        if (error) {
            console.log(error);
            return res.status(404).json({ error: 'Invalid Email' });
        }

        // const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
        // // Assuming you have a method to send emails
        // await sendResetPasswordEmail(otpCode, user.email, user.fullName);
        // await supabase
        //     .from('users')
        //     .update({ otpCode })
        //     .eq('email', email);

        return res.status(200).json({ message: 'OTP sent to your email' });
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

// Handle forgot password
// const forgetPassword = async (req, res) => {
//   const { email, password, otpCode } = req.body;
//   const { data: user, error } = await supabase
//     .from('users')
//     .select('id, otpCode')
//     .eq('email', email)
//     .single();

//   if (error || !user || user.otpCode !== otpCode) {
//     return res.status(400).json({ error: 'Invalid OTP Code or Email' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);
//   await supabase
//     .from('users')
//     .update({ password: hashedPassword, otpCode: '' })
//     .eq('email', email);

//   return res.status(200).json({ message: 'Your password has been changed successfully' });
// };

// Change password
const changePassword = async (req, res) => {
    try{
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const { error } = await supabase.auth.updateUser({ password: password });

        if (error) {
            return res.status(400).json({ error: error.message });
        }

        return res.status(200).json({ message: 'Your password has been changed successfully' }); 
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }

};

// Get logged-in user's profile by ID
// const getLoggedInUsersProfileById = async (req, res) => {
//     try {
//         const { id } = req.user;
//         const { data: profile, error } = await supabase
//             .from('profiles')
//             .select('*')
//             .eq('id', id)
//             .single();


//         if (error) {
//             console.log(error);
//             return res.status(500).json({ error: error.message });
//         }

//         console.log(req.user);  // Logging
//         return res.status(200).json(req.user);
//     }
//     catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.message });
//     }
// };

const getLoggedInUsersProfileById = async (req, res) => {
    try {
        return res.status(200).json(req.user);
    }
    catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

const inviteSubUser = async (req, res) => {
    try {
      const { email } = req.body;
      const primaryUserId = req.user.id;
  
      const { data, error } = await supabase.auth.api.inviteUserByEmail(email, {
        redirectTo: `${process.env.FRONTEND_URL}/register-sub-user`
      });
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      await supabase.from('sub_users').insert([{ email, primary_user_id: primaryUserId }]);
  
      return res.status(200).json({ message: 'Invitation sent successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
const registerSubUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, session, error } = await supabase.auth.signUp({
        email,
        password
      });
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      return res.status(200).json({ message: 'Sub-user registered successfully', user, session });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};
  
const toggleSubUser = async (req, res) => {
    try {
      const { subUserId, isActive } = req.body;
  
      const { data, error } = await supabase
        .from('sub_users')
        .update({ is_active: isActive })
        .eq('id', subUserId);
  
      if (error) {
        return res.status(400).json({ error: error.message });
      }
  
      return res.status(200).json({ message: 'Sub-user status updated successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
};

export default {
  register,
  login,
  logout,
  updateUsersProfile,
  resetPassword,
  changePassword,
  getLoggedInUsersProfileById,
  inviteSubUser,
  registerSubUser,
  toggleSubUser
};
