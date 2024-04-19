require('dotenv').config()
const express = require('express');
const allRoutes = require('./routes/index')


const app = express();

app.use(express.json()); // for parsing application/json

app.use(allRoutes);


app.listen(process.env.PORT, () => {
    console.log(`http://localhost:${process.env.PORT}`);
});