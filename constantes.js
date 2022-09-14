const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
    database: 'projet3',
    server: 'MSI\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
      trustedConnection: true
    }
  })

// eslint-disable-next-line import/prefer-default-export
module.exports = pool;
