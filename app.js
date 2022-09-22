const express = require('express');
require('dotenv').config();

const app = express();
const cors = require('cors');
const authentification = require('./authentification');

const PORT = process.env.PORT || 3000;

const utilisateursRouter = require('./routes/utilisateurs');
const connexion = require('./routes/connexion')

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/utilisateurs', utilisateursRouter);

app.use('/connexion',connexion)

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
