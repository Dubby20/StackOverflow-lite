import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// const config = process.env.DATABASE_URL;
// const test = process.env.TEST_DB_URL;
// const env = process.env.NODE_ENV;

// let config;

// if (env) {
//   config = test;
// } else {
//   config = dev;
// }

// export default config;
const pool = new pg.Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'stackoverflowlitedb',
  password: 'stackoverflow',
  port: '5432'
});

export default pool;