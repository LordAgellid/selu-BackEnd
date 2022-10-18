const knexModule = require('knex');
const chaineConnexion = require('../connexionBd');

const knex = knexModule(chaineConnexion);

function getFavorisByUserId(UtilisateursId) {
    return knex('Livres')
    .select('Livres.*')
    .where('Favoris.UtilisateurId', UtilisateursId)
    .join('Favoris', 'Favoris.LivreId', 'Livres.Id')
}

module.exports = {
    getFavorisByUserId,
}