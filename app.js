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

const codeVerificationRouter = require('./routes/codeVerification');


app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/utilisateurs', utilisateursRouter);
app.use('/codeVerificaion', codeVerificationRouter);

app.use('/connexion',connexion)

// const sslServer = https.createServer({
//     key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
//     cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
// }, app)

// sslServer.listen(PORT, () => console.log(`Mon application roule sur https://localhost:${PORT}`));

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
