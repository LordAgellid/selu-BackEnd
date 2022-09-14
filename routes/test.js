const express = require('express');

const chaineConnexion = require('../constantes');

const router = express.Router();

router.get('/', async (req, res) => {
    chaineConnexion.connect().then(() => {
        //simple query
        chaineConnexion.request().query('select * from test', (err, result) => {
              console.log(result.recordsets[0])
              return res.status(200).json(result.recordsets[0]);
          })
      })

});

module.exports = router;
