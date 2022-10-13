const express = require('express');

const requestProfile = require('../database/profile');

const router = express.Router();

// //Multer :)
// const multer = require('multer');

// const path = require('path');

// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//     },
//     filename: function (req, file, cb) {
//     console.log(file);
//     cb(null ,file.originalname);
//     }
// });
// const upload = multer({storage: storage});

router.post('/modifier-profil', async (req, res) => {
  const { Prenom } = req.body;
  const { NomDeFamille } = req.body;
  const { Courriel } = req.body;
  const { Image } = req.body;
  try {

    const modifierMotDePasse = await requestProfile.modifierProfile(Courriel, Image, NomDeFamille, Prenom)


    res.status(200).send({
      "Message": "Le profile a ete modifie avec succes",
      "Image": Image
    });

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'server error'
    })
  }
});

router.use('/getFile', express.static('uploads'));

router.get('/:email', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  let resultat;
  try {
    resultat = await requestProfile.getProfileByMail(req.params.email);
  } catch (error) {
    res.status(500).json(error.message);
  }

  return res.status(200).json(resultat);
});

module.exports = router;