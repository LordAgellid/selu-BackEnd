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
        res.status(400).json({
            success: false,
            message:'server error'
        })
    }
});

module.exports = router;
