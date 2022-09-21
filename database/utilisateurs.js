const knexModule = require('knex');
const chaineConnexion = require('../constantes');

const knex = knexModule(chaineConnexion);

// Requete de test
function getUtilisateursAll() {
    return knex('Utilisateurs');
}

function getUtilisateursByID(IdUtilisateurs) {
    return knex('Utilisateurs')
        .where('Utilisateurs.Id', IdUtilisateurs)
        .select('*');
}

function insertUtilisateur(Prenom, NomDeFamille, Courriel, MotDePasse, DateDeCreation, DerniereConnexion, PhotoDeProfil, PhotoDeCouverture) {
    return knex('Utilisateurs')
        .insert({
            Prenom,
            NomDeFamille,
            Courriel,
            MotDePasse,
            DateDeCreation,
            DerniereConnexion,
            PhotoDeProfil,
            PhotoDeCouverture
        }, ['Id'])
        .returning('Id');
}

// Requete knex qui retourne les informations de connexion
function connexion(identifiant, motDePasse) {
    return knex('Utilisateurs')
        .where('Identifiant', identifiant)
        .andWhere('MotDePasse', motDePasse);
}

module.exports = {
    getUtilisateursAll,
    connexion,
    getUtilisateursByID,
    insertUtilisateur,
};