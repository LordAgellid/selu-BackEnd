const knexModule = require('knex');
const chaineConnexion = require('../connexionBd');

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

function getProfileByMail(courriel, photoDeProfil, photoDeCouverture, nomDeFamille, prenom) {
    return knex('Utilisateurs')
        .where('Utilisateurs.Courriel', courriel)
        .select('photoDeProfil', 'photoDeCouverture', 'nomDeFamille', 'prenom');
}

module.exports = {
    getUtilisateursAll,
    connexion,
    getUtilisateursByID,
    insertUtilisateur,
    ifMailExists,
    findMdp,
    modifierMotDePasse,
    modifierProfile,
    getProfileByMail
};