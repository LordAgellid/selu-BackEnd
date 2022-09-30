const express = require('express');

const requestProfile = require('../database/profile');

const router = express.Router();

//Multer :)
const multer = require('multer');

const path = require('path');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
    },
    filename: function (req, file, cb) {
    console.log(file);
    cb(null ,file.originalname);
    }
});
const upload = multer({storage: storage});

router.post('/Modifierprofile', upload.single('image'), async(req, res) => {
  const { Prenom } = req.body;
  const { NomDeFamille } = req.body;
  const { Courriel } = req.body;
  const path = `http://localhost:3000/profile/getFile/${req.file.originalname}`
  try{

    //const modifierMotDePasse = await requestProfile.modifierProfile(Courriel, path, null, NomDeFamille, Prenom)
    const modifierMotDePasse = await requestProfile.modifierProfile('adwadw@.com', path, null, 'Lamy', 'Nat')

    res.status(200).send({
      "Message": "Image updated & stored",
      "Image": req.file
    });

  } catch(error) {
      console.log(error)
      return res.status(400).json({
          success: false,
          message:'server error'
      })
  }
});

//Créer une route /getFile/nomImage. extensionImage
//permettant de visualiser l’image dans le navigateur web.

router.use('/getFile', express.static('uploads'));

module.exports = router;