const knexModule = require('knex');
const chaineConnexion = require('../connexionBd');

const knex = knexModule(chaineConnexion);

function ajouterLivre(Titre, DescriptionLivre, NbPages, Prix, DatePublication, CoursId, CollectionId, MaisonEdition, PhotoId) {
    return knex('Livres')
    .insert({
        Titre: Titre,
        DescriptionLivre: DescriptionLivre,
        NbPages: NbPages,
        Prix: Prix,
        DatePublication: DatePublication,
        CoursId: CoursId,
        CollectionId: CollectionId,
        MaisonEdition: MaisonEdition,
        PhotoId: PhotoId
    }, ['Id'])
    .returning('Id');
}

function supprimerLivre(idLivre) {
    return knex('Livres')
    .where({
        Id: idLivre,
    })
    .del();
}

module.exports = {
    supprimerLivre,
    ajouterLivre,
}