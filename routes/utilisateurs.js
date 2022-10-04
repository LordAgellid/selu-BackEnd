const express = require('express');

const bcrypt = require('bcrypt');

const requestUtlisateur = require('../database/utilisateurs');

const router = express.Router();


router.get('/', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await requestUtlisateur.getUtilisateursAll();
    } catch (error) {
        res.status(500).json(error.message);
    }

    return res.status(200).json(resultat);
});

router.get('/:id', async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');

    let resultat;
    try {
        resultat = await requestUtlisateur.getUtilisateursByID(req.params.id);
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

    resultatmail = await requestUtlisateur.ifMailExists(Courriel);
    if (resultatmail.length !== 0) return res.status(404).json({ success: false, message: 'Le mail existe deja'});

    var MotDePasseHash = await bcrypt.hash(MotDePasse, 8);

    var now = new Date();
    var datenow = now.toISOString();

    try {
        const id = await requestUtlisateur.insertUtilisateur(
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

router.put('/modifierMotDePasse', async (req, res) =>{
    try{
        const body = req.body
        const mdp = await bcrypt.hash(body.MotDePasse, 8);
        const courriel = body.Courriel

        const modifierMotDePasse = await requestUtlisateur.modifierMotDePasse(courriel, mdp) 

        res.status(200).json({
            success: true,
            message: 'Mot de passe modifié',
            
        });

    }catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            message:'server error'
        })
    }
});
module.exports = router;
