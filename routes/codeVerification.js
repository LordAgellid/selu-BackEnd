const express = require('express');

const requestUtisateur = require('../database/utilisateurs');
const requestCodeVerif = require('../database/codeVerfication');

const router = express.Router();

const nodemailer = require("nodemailer")

const constantes = require("../constantes")

const {sendMail} = require("../email")


router.post('/envoyerMailConfirmationMdp', async (req, res)=>{

    try{
        
        const email = req.body.Courriel;

        const emailRequest = await requestUtisateur.ifMailExists(email); 

        if(emailRequest.length === 0) return res.status(404).json({ success: false })
        

        const code = constantes.randomCode();

        const suppCourrielDeLaTable = await requestCodeVerif.deleteCodeVerificationByMail(email)

        const insertData = await requestCodeVerif.insertCodeVerification(code, email)


        sendMail(email, 'Mot de passe oublié', code);

        return res.status(200).json({
            success: true,
        });

    }catch(error) {
        return res.status(400).json({
            success: false,
            message: 'Server Error'
        })
    }
});

router.post('/confirmationCode', async (req, res)=>{
    try{
        
        const body = req.body
        const codeUser = body.Code
        const courriel = body.Courriel 
    
        const codeData = await requestCodeVerif.findCodeVerification(courriel)

        if(codeUser != codeData[0]['Code']) return res.status(401).json({
            success: false
        })

        const deleteCode = await requestCodeVerif.deleteCodeVerificationByMail(courriel) 

        return res.status(200).json({
            success: true
        })
    }catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            message: 'Server Error'
        })
    }


});

module.exports = router;