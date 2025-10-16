import { DefaultAuthProvider } from 'adminjs';
import { client } from '../db/postgres-client.js';

import { componentLoader } from './component-loader.js';
import * as argon2 from 'argon2';
const authenticate = async ({ email, password }: { email: string; password: string }) => {
  try {
    const result = await client.query('SELECT * FROM public."admins" WHERE email = $1', [email]);

    const admin = result.rows[0];

    if (!admin) {
      return null;
    }

    const isMatch = await argon2.verify(admin.password, password);

    if (!isMatch) {
      return null;
    }

    return admin;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
};
const provider = new DefaultAuthProvider({
  componentLoader,
  authenticate,
});

export default provider;
