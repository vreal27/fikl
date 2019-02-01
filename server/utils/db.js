import config from 'config'
import mysql from 'mysql'

const connection = mysql.createConnection({
  host: config.get('db.host'),
  user: config.get('db.user'),
  password: config.get('db.password'),
  database: config.get('db.database')
})

export default connection