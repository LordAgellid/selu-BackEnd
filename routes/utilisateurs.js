const express = require('express');

const bcrypt = require('bcrypt');

const request = require('../database/utilisateurs');

const router = express.Router();

const nodemailer = require("nodemailer")

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

function randomCode(){
    return (Math.random().toString(36).slice(-6))
}

router.post('/envoyerMailConfirmationMdp', async (req, res)=>{

    try{
        
        const email = req.body.Courriel;

        const emailRequest = await request.ifMailExists(email); 

        if(emailRequest.length === 0) res.status(401).json({ success: false })
        

        const code = randomCode();

        const suppCourrielDeLaTable = await request.deleteCodeVerificationByMail(email)


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
        
        const insertData = await request.insertCodeVerification(code, email)

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
    
        const codeData = await request.findCodeVerification(courriel)

        if(codeUser != codeData[0]['Code']) res.status(400).json({
            success: false
        })

        const deleteCode = await request.deleteCodeVerificationByMail(courriel) 

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

router.put('/modifierMotDePasse', async (req, res) =>{
    try{
        const body = req.body
        const mdp = await bcrypt.hash(body.MotDePasse, 8);
        const courriel = body.Courriel

        const modifierMotDePasse = await request.modifierMotDePasse(courriel, mdp) 

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
