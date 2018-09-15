//express needed for routes
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');
const bodyParser = require ('body-parser')
//CONNECTION
mongoose.connect('mongodb://localhost/myDb');
// BODY BARSER SHOULD BE CALLED BEFROE USING ROUTES
app.use(bodyParser.json());
app.use(userRoutes);
app.use(adminRoutes);
app.listen(3000);
