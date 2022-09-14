const express = require('express');

const bcrypt = require('bcrypt');

const chaineConnexion = require('../constantes');

const router = express.Router();

router.get('/', async (req, res) => {
    chaineConnexion.connect().then(() => {
        //simple query
        chaineConnexion.request().query('select * from utilisateurs', (err, result) => {
              console.log(result.recordsets[0])
              return res.status(200).json(result.recordsets[0]);
          })
      })

});

require ('mssql/msnodesqlv8')


router.post('/inscription', async (req, res) => {
    let bodyy = {...req.body}
    console.log(bodyy);
    bodyy.MotDePasse = await bcrypt.hash(bodyy.MotDePasse, 8);

    var now = new Date();
    var datenow = now.toISOString();
    var NULL = null

    try {
        chaineConnexion.connect().then(() => {
            chaineConnexion.query(`insert into Utilisateurs values
            ('${bodyy.Prenom}',
            '${bodyy.NomDeFamille}',
            '${bodyy.Courriel}',
            '${bodyy.MotDePasse}',
            '${datenow}',
            '${datenow}',
            '${NULL}',
            '${NULL}')`, (err) => {
                if(err) {
                    console.log(err);
                    return res.status(500).send("Server error!!!!");
                }
            });
        })
    }
    catch (err) {
        console.log(err);
    }
    return res.status(200).send({Success: bodyy});
});

module.exports = router;
