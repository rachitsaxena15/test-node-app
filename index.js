const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
const passport = require('passport');
require('./models/User');
require('./services/passport');


const app = express();
app.use(
    cookieSession({
        maxAge: 30*24*60*60*1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());
const authRoutes = require('./routes/authRoutes');
authRoutes(app);

mongoose.connect('mongodb://localhost/emaily-dev', {useNewUrlParser: true});
const PORT = process.env.PORT || 5000;
app.listen(PORT);