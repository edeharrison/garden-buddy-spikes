const { Pool } = require('pg')

require('dotenv').config({
  path: `${__dirname}/.env`
})

if (!process.env.PGDATABASE) {
  throw "no db"
}

module.exports = new Pool();