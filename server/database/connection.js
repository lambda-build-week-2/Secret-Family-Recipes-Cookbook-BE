import { Pool } from 'pg';
import { config } from 'dotenv';

config();

const testConfig = {
  database: process.env.DB_NAME_TEST,
  host: process.env.DB_HOST_TEST,
  user: process.env.DB_USER_TEST,
  password: process.env.DB_PASSWORD_TEST,
  port: process.env.DB_PORT_TEST,
};

const createTableUsers = `CREATE TABLE IF NOT EXISTS users (
  userid serial PRIMARY KEY,
  email varchar(80) UNIQUE,
  password varchar(400),
  firstname varchar(50),
  lastname varchar(50), 
  timeRegistered TIMESTAMP NOT NULL DEFAULT NOW()
  )`;

const createTableRecipe = `CREATE TABLE IF NOT EXISTS recipes (
  recipeid serial PRIMARY KEY,
  userid serial REFERENCES users(userid) ON DELETE CASCADE,
  title varchar UNIQUE,
  source varchar,
  ingredients varchar,
  category varchar
)`
const dropTables = 'DROP TABLE users; DROP TABLE users';

const db = (process.env.NODE_ENV === 'test') ? new Pool(testConfig) : new Pool();
const createTables = async (dev) => {
  if (dev === 'test') {
    try {
      await db.query(`${dropTables}; ${createTableUsers}; ${createTableRecipe}`);
      console.log(' Test table dropped and created!.');
    } catch (err) {
      return false;
    }
  } else {
    try {
      await db.query(`${createTableUsers}; ${createTableRecipe}`);
      console.log('Tables created!');
    } catch (err) {
      return false;
    }
  }
  return true;
};

createTables(process.env.NODE_ENV).then(x => console.log('Working'));

export default db;
