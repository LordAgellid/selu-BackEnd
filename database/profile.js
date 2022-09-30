const knexModule = require('knex');
const chaineConnexion = require('../connexionBd');

const knex = knexModule(chaineConnexion);

function modifierProfile(courriel, photoDeProfil, photoDeCouverture, nomDeFamille, prenom) {
    return knex('Utilisateurs')
    .where({
        Courriel: courriel 
    })
    .update({
        NomDeFamille: nomDeFamille,
        Prenom: prenom,
        PhotoDeProfil: photoDeProfil,
        PhotoDeCouverture: photoDeCouverture
    })
}

function getProfileByMail(courriel) {
    return knex('Utilisateurs')
        .where('Utilisateurs.Courriel', courriel)
        .select('PhotoDeProfil', 'PhotoDeCouverture', 'NomDeFamille', 'Prenom');
}

module.exports = {
    modifierProfile,
    getProfileByMail,
}