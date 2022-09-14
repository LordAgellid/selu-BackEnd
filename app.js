const express = require('express');

const app = express();
const cors = require('cors');

const PORT = process.env.PORT || 3000;

const testRouter = require('./routes/test');

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/test', testRouter);


app.listen(PORT, () => {
    console.log(`Mon application roule sur http://localhost:${PORT}`);
});
