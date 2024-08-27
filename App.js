const express = require('express');
//connection with MONGO
require('./database/connection')
const app = express();
//env
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' });
const PORT = process.env.PORT;
//Schema
const User = require('./model/userSchema')
//for json parsing (DATABASE RELATED)
app.use(express.json());
//route: dont write .js at the end
app.use(require('./router/auth'));
app.listen(PORT, () => {
    console.log(`server ${PORT}`)
});
app.get('/signin', (req, res) => {
    res.send(`Hello World from signIN`);
});


