const knexModule = require('knex');
const chaineConnexion = require('../connexionBd');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

// Requete knex qui retourne les informations de connexion
function connexion(Courriel) {
    return knex('Utilisateurs')
        .where('Courriel', Courriel);
}

// Requete qui verifie si un email existe
function ifMailExists(courriel){
    return knex('Utilisateurs').where({
        Courriel: courriel
      }).select('Courriel')
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
    findMdp,
    modifierMotDePasse
};