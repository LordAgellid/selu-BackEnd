const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

router.post('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;

    try {
        const { Courriel , MotDePasse } = req.body;
        resultat = await request.connexion(Courriel);
        if (resultat.length === 0) {

            return res.status(404).json({ succes: false });
        }
        password = bcrypt.compareSync(MotDePasse,resultat[0].MotDePasse);
        if (!password) return res.status(401).json({success: false})

    } catch (error) {
        res.status(500).json(error);
    }
    const expiresIn = 14400;
    const accessToken = jwt.sign({ Courriel: resultat[0].Courriel }, process.env.TOKEN_KEY, {
        expiresIn,
    });

    return res.status(200).json({
        success: true,
        Courriel: resultat[0].Courriel,
        Nom: resultat[0].NomDeFamille,
        Prenom: resultat[0].Prenom,
        access_token: accessToken,
        expires_in: expiresIn,
    });
});

module.exports = router;
