import pg from 'pg';
// import dotenv from 'dotenv';

// dotenv.config();

const connectionString = 'postgres://fhwvjmgdooedgs:45f091bb74c50cf4f80c6ed023d6f8e22f8c7e5f6af4a8b106eb33ee6d8bcd4d@ec2-54-225-92-1.compute-1.amazonaws.com:5432/d6m9i7p1j93o8u?ssl=true';

// if (process.env.NODE_ENV === 'test') {
//   connectString = 'postgres://qayyygzv:WD_Px0Cear8jyUJF-FoZgLjR82ALbNbz@baasu.db.elephantsql.com:5432/qayyygzv';
// }

const pool = new pg.Pool({
  connectionString
});

export default pool;