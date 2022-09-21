const express = require('express');

const bcrypt = require('bcrypt');

const request = require('../database/utilisateurs');

const router = express.Router();

router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getUtilisateursAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

// router.get('/', async (req, res) => {
//     chaineConnexion.connect().then(() => {
//         //simple query
//         chaineConnexion.request().query('select * from utilisateurs', (err, result) => {
//               console.log(result.recordsets[0])
//               return res.status(200).json(result.recordsets[0]);
//           })
//       })

// });

// router.get('/:id', async (req, res) => {
//     chaineConnexion.connect().then(() => {
//         //simple query
//         chaineConnexion.request().query(`select * from utilisateurs where id = ${req.params.id}`, (err, result) => {
//               console.log(result.recordsets[0])
//               return res.status(200).json(result.recordsets[0]);
//         })
//       })

// });

// router.post('/inscription', async (req, res) => {
//     let bodyy = {...req.body}
//     console.log(bodyy);

//     bodyy.MotDePasse = await bcrypt.hash(bodyy.MotDePasse, 8);

//     var now = new Date();
//     var datenow = now.toISOString();
//     var NULL = null

//     chaineConnexion.connect().then(() => {
//             chaineConnexion.query(`insert into Utilisateurs values
//         ('${bodyy.Prenom}',
//         '${bodyy.NomDeFamille}',
//         '${bodyy.Courriel}',
//         '${bodyy.MotDePasse}',
//         '${datenow}',
//         '${datenow}',
//         '${NULL}',
//         '${NULL}')`, (err) => {
//             if(err) {
//                 return res.status(500).send("Le courriel existe deja");
//             } else {
//                 return res.status(200).send({Success: bodyy});
//             }
//         });
//     })
// });

module.exports = router;
