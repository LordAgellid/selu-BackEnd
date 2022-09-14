const sql = require('mssql/msnodesqlv8')

const pool = new sql.ConnectionPool({
    database: 'selu',
    server: 'MSI\\SQLEXPRESS',
    driver: 'msnodesqlv8',
    options: {
      trustedConnection: true
    }
  })

pool.on('error', err => {
  if (err)  console.log('sql errors', err);
  if (!err) pool.connect();
});
pool.connect();

// eslint-disable-next-line import/prefer-default-export
module.exports = pool;
