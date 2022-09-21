const chaineConnexion = {
  client: 'mssql',
  connection: {
      host: 'sv55.cmaisonneuve.qc.ca',
      user: '5D1G01E05',
      password: 'Selu355',
      database: '5D1G01E05',
      options: {
          enableArithAbort: false,
      },
  },
  pool: { min: 0, max: 7 },
  useNullAsDefault: true,
};

// eslint-disable-next-line import/prefer-default-export
module.exports = chaineConnexion;
