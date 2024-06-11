// import express from "express";
// import users from "../controllers/users.js";
// import tokenValidation from "../validation/tokenValidation.js";
// const router = express.Router();

// router.post("/register", users.register);
// router.post("/login", users.login);
// router.put("/logout/:id", tokenValidation, users.logout);
// // router.put("/updateCustomersProfile", tokenValidation, users.updateUsersProfile);
// // router.put("/forgetPasswordOtp", users.forgetPasswordOtp);
// // router.put("/forgetPassword", users.forgetPassword);
// // router.put("/changePassword", tokenValidation, users.changePassword);
// // // router.post("/updateProfilePic", tokenValidation, users.updateProfilePic);
// // router.get("/getLoggedInCustomersProfileById/:id", tokenValidation, users.getLoggedInUsersProfileById);
// export default router;

import express from 'express';
import users from '../controllers/users.js';
import tokenValidation from '../middleware/tokenValidation.js';

const router = express.Router();

// Route to register a new user
router.post('/register', users.register);

// Route to login a user
router.post('/login', users.login);

// Route to update user's profile
router.put('/update', tokenValidation, users.updateUsersProfile);

// // Route to handle forgot password OTP
// router.post('/forget-password-otp', users.forgetPasswordOtp);

// // Route to handle forgot password
// router.post('/forget-password', users.forgetPassword);

router.post('/reset-password', users.resetPassword);

// Route to change password
router.put('/change-password', tokenValidation, users.changePassword);

// Route to get logged-in user's profile by ID
router.get('/profile/:id', tokenValidation, users.getLoggedInUsersProfileById);

// Route to logout a user
router.post('/logout', users.logout);

router.get('/get-user', tokenValidation, users.getLoggedInUsersProfileById);

router.post('/invite-sub-user', tokenValidation, users.inviteSubUser);

// Register sub-user
router.post('/register-sub-user', users.registerSubUser);

// Toggle sub-user status
router.post('/toggle-sub-user', tokenValidation, users.toggleSubUser);

export default router;
