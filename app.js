const express = require('express');

const https = require('https');
const path = require('path');
const fs = require('fs');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const utilisateursRouter = require('./routes/utilisateurs');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/utilisateurs', utilisateursRouter);

const sslServer = https.createServer({
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
}, app)

sslServer.listen(PORT, () => console.log(`Mon application roule sur https://localhost:${PORT}`));

// app.listen(PORT, () => {
//     console.log(`Mon application roule sur http://localhost:${PORT}`);
// });
