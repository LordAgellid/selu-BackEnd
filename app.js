const express = require('express');
require('dotenv').config();

const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
const cors = require('cors');
const authentification = require('./authentification');

const PORT = process.env.PORT || 3000;

const utilisateursRouter = require('./routes/utilisateurs');
const connexion = require('./routes/connexion')
//const profileRouter = require('./routes/profile');
const codeVerificationRouter = require('./routes/codeVerification');
const profilRouter = require('./routes/profil');
const articleLivreRouter = require('./routes/articleLivres');
const articleFavorisRouter = require('./routes/articleFavoris');


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API de Selu')
})

app.use('/utilisateurs', utilisateursRouter);
app.use('/code-verification', codeVerificationRouter);
app.use('/profil', profilRouter);
app.use('/articles/livres', articleLivreRouter);
app.use('/articles/favoris', articleFavorisRouter);
app.use('/connexion', connexion);

app.listen(PORT, () => {
    console.log(`Mon application roule sur -> http://localhost:${PORT}\n`);
});
