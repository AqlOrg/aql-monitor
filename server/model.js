require('dotenv').config();

const { Pool } = require('pg');
const pg_url = process.env.DATABASE_URL;
const pool = new Pool({ connectionString: pg_url });

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};