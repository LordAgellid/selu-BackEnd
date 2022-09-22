const express = require('express');

const requestUtisateur = require('../database/utilisateurs');
const requestCodeVerif = require('../database/codeVerfication');

const router = express.Router();

const nodemailer = require("nodemailer")

const constantes = require("../constantes")


router.post('/envoyerMailConfirmationMdp', async (req, res)=>{

    try{
        
        const email = req.body.Courriel;

        const emailRequest = await requestUtisateur.ifMailExists(email); 

        if(emailRequest.length === 0) res.status(401).json({ success: false })
        

        const code = constantes.randomCode();

        const suppCourrielDeLaTable = await requestCodeVerif.deleteCodeVerificationByMail(email)


        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth: {
              user: "seluentreprise@gmail.com", // generated ethereal user
              pass: "qsgjpkzwwndgjpri", // generated ethereal password
            },
            debug: false,
            logger: true  // <---highly recommend this one here
        });

        let info = await transporter.sendMail({
            from: 'selu.entreprise',
            to: email,
            subject:"Mot de passe oublié",
            text: "Code de rehinitialisation de mot de passe",
            html: `<h1>Code de confirmation</h1><p>Vous avez fait une demande de changement de mot de passe </p>
                    <p>Votre code de confirmation : </p>
                    <h1>${code}</h1>`
        });
        
        const insertData = await requestCodeVerif.insertCodeVerification(code, email)

        console.log("Message sent: %s", info.messageId);
        res.status(200).json({
            success: true,
            // messageId: info.messageId
        });

    }catch(error) {
        console.log(error)
        res.send(error)
    }
});

router.post('/confirmationCode', async (req, res)=>{
    try{
        
        const body = req.body
        const codeUser = body.Code
        const courriel = body.Courriel 
    
        const codeData = await requestCodeVerif.findCodeVerification(courriel)

        if(codeUser != codeData[0]['Code']) res.status(400).json({
            success: false
        })

        const deleteCode = await requestCodeVerif.deleteCodeVerificationByMail(courriel) 

        res.status(200).json({
            success: true
        })
    }catch(error){
        console.log(error)
        res.status(400).json({
            success: false,
            message: 'Server Error'
        })
    }


});

module.exports = router;