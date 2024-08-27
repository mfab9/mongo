const dotenv = require('dotenv')
const mongoose = require('mongoose');
dotenv.config({ path: './config.env' });
//connect
const DB = process.env.DATABASE
mongoose.connect(DB).then(() => {
    console.log(`Connected with DataBase`);
}).catch((err) => console.log("NOT CONNECTED WITH DATABASE "));
