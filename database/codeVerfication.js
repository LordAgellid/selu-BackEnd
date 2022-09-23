const knexModule = require('knex');
const chaineConnexion = require('../connexionBd');

const knex = knexModule(chaineConnexion);


function findCodeVerification(courriel){
    return knex('CodeVerification').where({
        CourrielUtilisateur: courriel
    }).select('Code')
}

function insertCodeVerification(code, courriel){
    return knex('CodeVerification').insert({
        Code: code, CourrielUtilisateur: courriel
    })
}

function deleteCodeVerificationByMail(courriel){
    return knex('CodeVerification').where({
        CourrielUtilisateur: courriel
    }).del()
}


module.exports ={
    deleteCodeVerificationByMail,
    insertCodeVerification,
    findCodeVerification
}