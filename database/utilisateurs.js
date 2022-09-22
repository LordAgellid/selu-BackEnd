const knexModule = require('knex');
const chaineConnexion = require('../constantes');

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

module.exports = {
    getUtilisateursAll,
    connexion,
};