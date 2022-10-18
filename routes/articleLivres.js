const express = require('express');

const requestArticleLivre = require('../database/articleLivres');

const router = express.Router();

router.post('/ajouter-livre', async (req, res) => {
  const { Titre } = req.body;
  const { DescriptionLivre } = req.body;
  const { NbPages } = req.body;
  const { Prix } = req.body;
  const { DatePublication } = req.body;
  var { CoursId } = req.body;
  var { CollectionId } = req.body;
  var { MaisonEdition } = req.body;
  var { PhotoId } = req.body;
  if(!CoursId) {CoursId = null}
  if(!PhotoId) {PhotoId = null}
  if(!MaisonEdition) {MaisonEdition = 'Aucune'}
  if(!CollectionId) {CollectionId = 'Aucune'}
  try {

    const reponse = await requestArticleLivre.ajouterLivre(Titre, DescriptionLivre, NbPages, Prix, DatePublication, CoursId, CollectionId, MaisonEdition, PhotoId)


    res.status(200).send({
      success: true,
      Message: "Le livre a été ajouté avec succès",
      Status: 200,
      Information: reponse
    });

  } catch (error) {
    console.log(error)
    return res.status(400).json({
      success: false,
      message: 'server error'
    })
  }
});

router.delete('/supprimer-livre', async (req, res) => {
    const { idLivre } = req.body;
    console.log(idLivre)
    try {
  
      const reponse = await requestArticleLivre.supprimerLivre(idLivre)
  
  
      res.status(200).send({
        success: true,
        Message: "Le livre a été supprimer avec succès",
        Status: 200,
        Information: reponse
      });
  
    } catch (error) {
      console.log(error)
      return res.status(400).json({
        success: false,
        message: 'server error'
      })
    }
});

module.exports = router;