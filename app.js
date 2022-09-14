const express = require('express');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const testRouter = require('./routes/test');
const utilisateursRouter = require('./routes/utilisateurs');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/test', testRouter);
app.use('/utilisateurs', utilisateursRouter);


app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
