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

router.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await request.getUtilisateursByID(req.params.id);
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

router.post('/inscription', async (req, res) => {
    const { Prenom } = req.body;
    const { NomDeFamille } = req.body;
    const { Courriel } = req.body;
    const { MotDePasse } = req.body;
    console.log(Prenom, NomDeFamille, Courriel, MotDePasse);

    if (!Prenom || !NomDeFamille || !Courriel || !MotDePasse) {
        return res.status(400).json('Le Prenom, NomDeFamille, Courriel, MotDePasse ne doivent pas etre vides');
    }

    var MotDePasseHash = await bcrypt.hash(MotDePasse, 8);

    var now = new Date();
    var datenow = now.toISOString();

    try {
        const id = await request.insertUtilisateur(
            Prenom,
            NomDeFamille,
            Courriel,
            MotDePasseHash,
            datenow,
            datenow,
            null,
            null
        );
        return res.status(200).json({
            message: 'Personne ajoutée',
            IdPersonne: id,
        });
    } catch (error) {
        return res.status(500).json(error.message);
    }
});

module.exports = router;