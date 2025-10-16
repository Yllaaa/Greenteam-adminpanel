import express from 'express';
import * as argon2 from 'argon2';
import { client } from '../db/postgres-client.js';

const router = express.Router();

const validateAdminInput = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }
  next();
};

router.post('/create-admin', validateAdminInput, async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await argon2.hash(password);

    const query = `
      INSERT INTO public."admins" (email, password) 
      VALUES ($1, $2) 
      RETURNING id, email;
    `;

    const values = [email, hashedPassword];

    const result = await client.query(query, values);

    res.status(201).json({
      message: 'Admin created successfully.',
      admin: result.rows[0],
    });
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).json({ message: 'An error occurred while creating the admin.' });
  }
});

export default router;
