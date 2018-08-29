import pg from 'pg';
import dotenv from "dotenv";


// const pool = new pg.Pool({
//   user: process.env.USER,
//   host: process.env.HOST,
//   database: process.env.DATABASE,
//   password: process.env.PASSWORD,
//   port: process.env.PORT
// });
const pool = new pg.Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'stackoverflowlitedb',
  password: 'stackoverflow',
  port: '5432'
});

export default pool;