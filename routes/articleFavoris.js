const express = require('express');

const requestFavoris = require('../database/articleFavoris');

const router = express.Router();

router.get('/:id', async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  let resultat;
  try {
    resultat = await requestFavoris.getFavorisByUserId(req.params.id);
  } catch (error) {
    res.status(500).json(error.message);
  }

  return res.status(200).json(resultat);
});

module.exports = router;