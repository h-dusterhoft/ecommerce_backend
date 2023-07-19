const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: 'ecommerce',
  password: 'dbtestpw',
  port: 5432,
})