const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// User registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, userType, firstName, lastName } = req.body;

    // Check if user already exists
    const existingUser = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (email, password, user_type, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING id, email, user_type, first_name, last_name',
      [email, hashedPassword, userType, firstName, lastName]
    );

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser.rows[0].id, email, userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      user: newUser.rows[0],
      token
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const validPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: user.rows[0].id, 
        email: user.rows[0].email, 
        userType: user.rows[0].user_type 
      },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      user: {
        id: user.rows[0].id,
        email: user.rows[0].email,
        userType: user.rows[0].user_type,
        firstName: user.rows[0].first_name,
        lastName: user.rows[0].last_name
      },
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create/Update profile
app.post('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { 
      investmentRange, 
      experienceLevel, 
      preferredIndustries, 
      timeline,
      businessSize,
      locationPreference,
      liquidCapital,
      riskTolerance,
      bio
    } = req.body;

    const userId = req.user.userId;
    const userType = req.user.userType;

    // Check if profile exists
    const existingProfile = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [userId]
    );

    if (existingProfile.rows.length > 0) {
      // Update existing profile
      await pool.query(
        `UPDATE profiles SET 
          investment_range = $1, 
          experience_level = $2, 
          preferred_industries = $3, 
          timeline = $4,
          business_size = $5,
          location_preference = $6,
          liquid_capital = $7,
          risk_tolerance = $8,
          bio = $9,
          updated_at = NOW()
        WHERE user_id = $10`,
        [
          investmentRange, 
          experienceLevel, 
          preferredIndustries, 
          timeline,
          businessSize,
          locationPreference,
          liquidCapital,
          riskTolerance,
          bio,
          userId
        ]
      );
    } else {
      // Create new profile
      await pool.query(
        `INSERT INTO profiles (
          user_id, 
          investment_range, 
          experience_level, 
          preferred_industries, 
          timeline,
          business_size,
          location_preference,
          liquid_capital,
          risk_tolerance,
          bio
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          userId, 
          investmentRange, 
          experienceLevel, 
          preferredIndustries, 
          timeline,
          businessSize,
          locationPreference,
          liquidCapital,
          riskTolerance,
          bio
        ]
      );
    }

    res.json({ message: 'Profile saved successfully' });
  } catch (error) {
    console.error('Profile save error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get buyer profiles for sellers
app.get('/api/buyers', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'seller') {
      return res.status(403).json({ error: 'Only sellers can view buyer profiles' });
    }

    const sellerId = req.user.userId;

    // Get buyer profiles that haven't been accepted/rejected by this seller
    const buyers = await pool.query(
      `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        p.investment_range,
        p.experience_level,
        p.preferred_industries,
        p.timeline,
        p.business_size,
        p.location_preference,
        p.liquid_capital,
        p.risk_tolerance,
        p.bio,
        p.created_at,
        p.updated_at,
        COALESCE(m.status, 'pending') as status
      FROM users u
      JOIN profiles p ON u.id = p.user_id
      LEFT JOIN matches m ON u.id = m.buyer_id AND m.seller_id = $1
      WHERE u.user_type = 'buyer'
      ORDER BY p.created_at DESC`,
      [sellerId]
    );

    res.json(buyers.rows);
  } catch (error) {
    console.error('Get buyers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Accept/Reject buyer
app.post('/api/matches/:buyerId', authenticateToken, async (req, res) => {
  try {
    if (req.user.userType !== 'seller') {
      return res.status(403).json({ error: 'Only sellers can accept/reject buyers' });
    }

    const { buyerId } = req.params;
    const { action } = req.body; // 'accept' or 'reject'
    const sellerId = req.user.userId;

    if (!['accept', 'reject'].includes(action)) {
      return res.status(400).json({ error: 'Invalid action' });
    }

    // Check if match already exists
    const existingMatch = await pool.query(
      'SELECT * FROM matches WHERE seller_id = $1 AND buyer_id = $2',
      [sellerId, buyerId]
    );

    if (existingMatch.rows.length > 0) {
      // Update existing match
      await pool.query(
        'UPDATE matches SET status = $1, updated_at = NOW() WHERE seller_id = $2 AND buyer_id = $3',
        [action, sellerId, buyerId]
      );
    } else {
      // Create new match
      await pool.query(
        'INSERT INTO matches (seller_id, buyer_id, status) VALUES ($1, $2, $3)',
        [sellerId, buyerId, action]
      );
    }

    res.json({ message: `Buyer ${action}ed successfully` });
  } catch (error) {
    console.error('Match action error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all buyer profiles (for sellers to view)
app.get('/api/buyers', authenticateToken, async (req, res) => {
  try {
    const userType = req.user.userType;
    
    // Only sellers can view buyer profiles
    if (userType !== 'seller') {
      return res.status(403).json({ error: 'Only sellers can view buyer profiles' });
    }

    const buyers = await pool.query(
      `SELECT 
        u.id,
        u.first_name,
        u.last_name,
        u.email,
        p.investment_range,
        p.experience_level,
        p.preferred_industries,
        p.timeline,
        p.business_size,
        p.location_preference,
        p.liquid_capital,
        p.risk_tolerance,
        p.bio,
        p.created_at,
        p.updated_at
      FROM users u
      JOIN profiles p ON u.id = p.user_id
      WHERE u.user_type = 'buyer'
      ORDER BY p.created_at DESC`
    );

    res.json(buyers.rows);
  } catch (error) {
    console.error('Get buyers error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user's matches
app.get('/api/matches', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userType = req.user.userType;

    let matches;
    if (userType === 'seller') {
      matches = await pool.query(
        `SELECT 
          m.id,
          m.status,
          m.created_at,
          u.first_name,
          u.last_name,
          u.email,
          p.investment_range,
          p.experience_level,
          p.preferred_industries
        FROM matches m
        JOIN users u ON m.buyer_id = u.id
        JOIN profiles p ON u.id = p.user_id
        WHERE m.seller_id = $1
        ORDER BY m.created_at DESC`,
        [userId]
      );
    } else {
      matches = await pool.query(
        `SELECT 
          m.id,
          m.status,
          m.created_at,
          u.first_name,
          u.last_name,
          u.email
        FROM matches m
        JOIN users u ON m.seller_id = u.id
        WHERE m.buyer_id = $1
        ORDER BY m.created_at DESC`,
        [userId]
      );
    }

    res.json(matches.rows);
  } catch (error) {
    console.error('Get matches error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const profile = await pool.query(
      `SELECT 
        u.first_name,
        u.last_name,
        u.email,
        u.user_type,
        p.investment_range,
        p.experience_level,
        p.preferred_industries,
        p.timeline,
        p.business_size,
        p.location_preference,
        p.liquid_capital,
        p.risk_tolerance,
        p.bio,
        p.created_at,
        p.updated_at
      FROM users u
      LEFT JOIN profiles p ON u.id = p.user_id
      WHERE u.id = $1`,
      [userId]
    );

    if (profile.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(profile.rows[0]);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

