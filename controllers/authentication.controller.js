import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class Authentication {

  static async signUp (req, res) {

    try {
      const { first_name, last_name, email, password, repeat_password } = req.body;
  
      // Check if the email is already registered
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ 
          success: false,
          error: "Email already exists",
        });
      }
  
      // Check if the passwords match
      if (password !== repeat_password) {
        return res.status(400).json({ 
          success: false,
          error: "Passwords do not match",
        });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user
      const user = await User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword,
      });

      // Generate access token
      const accessToken = await Authentication.generateAccessToken(user.id);

      res.json({
        success: true,
        body: user,
        accessToken
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
    
  };

  static async signIn (req, res) {

    try {
      const { email, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }
  
      // Check if the password is correct
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          error: 'Invalid credentials'
        });
      }

      // Generate access token
      const accessToken = await Authentication.generateAccessToken(user.id);
  
      res.json({
        success: true,
        message: 'Sign-in successful',
        accessToken
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }

  };

  static async logout (req, res) {
    try {
      // Perform any necessary logout actions
      // For example, you can invalidate the access token or remove it from the client's session

      res.json({
        success: true,
        message: 'Logout successful'
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Server error'
      });
    }
  };

  // Generate access token
  static async generateAccessToken (userId) {
    const accessToken = jwt.sign({ userId }, 'secret-key', { expiresIn: '1h' });
    return accessToken;
  };

  static authMiddleware(req, res, next) {
    // Extract the access token from the request headers
    const token = req.headers.authorization;

    // Check if the token is present
    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No access token provided'
      });
    }

    try {
      // Verify the access token
      const decoded = jwt.verify(token, 'secret-key');

      // Attach the decoded token to the request object
      req.user = decoded;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        error: 'Invalid access token'
      });
    }
  }

}