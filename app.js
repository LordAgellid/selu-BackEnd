const express = require('express');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const utilisateursRouter = require('./routes/utilisateurs');
const codeVerificationRouter = require('./routes/codeVerification');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/utilisateurs', utilisateursRouter);
app.use('/codeVerificaion', codeVerificationRouter);

app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
