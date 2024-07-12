require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser")
const connect = require('./config/db.js');
// const session = require('session');
// const passport = require('passport');
// const facebookStrategy = require('passport-facebook').Strategy;
const cookieParser = require('cookie-parser');



const userRoutes = require('./routes/userRoutes.js');

const port = process.env.PORT || 3000;
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors());


app.use('/user', userRoutes);


 const start = async () => {
    await connect(process.env.MONGO_URL)
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}

start()
