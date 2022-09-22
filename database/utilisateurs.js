const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

// Requete qui verifie si un email existe
function ifMailExists(courriel){
    return knex('Utilisateurs').where({
        Courriel: courriel
      }).select('Id')
}

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

function findMdp(courriel){
    return knex('Utilisateurs').where({
        Courriel: courriel 
    }).select('MotDePasse')
}

function modifierMotDePasse(courriel, motDePasse){
    return knex('Utilisateurs')
            .where({
                Courriel: courriel 
            })
            .update({
                MotDePasse: motDePasse
            })
}

module.exports = {
    getUtilisateursAll,
    connexion,
    ifMailExists,
    deleteCodeVerificationByMail,
    insertCodeVerification,
    findCodeVerification,
    findMdp,
    modifierMotDePasse
};