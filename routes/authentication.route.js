import express from 'express';
import Authentication from '../controllers/authentication.controller.js';

const router = express.Router();

// Sign-up route
router.post('/signup', Authentication.signUp);

// Sign-in route
router.post('/signin', Authentication.signIn);

// Logout route
router.post('/logout', Authentication.logout);

export default router;