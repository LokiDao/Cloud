const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helpers = require('./helpers');

const handlebars = require('handlebars');
const uri = "mongodb+srv://quocanh2105:quocanh123@waifuganktem.rwsm6.mongodb.net/miniproject?retryWrites=true&w=majority";
const mongo = require('mongodb');

// declare bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

// view engine
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
var {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const { MongoClient } = require('mongodb');
// declare static folder

//storage 
hbs.registerPartials(__dirname + '/views/partials')
const productRoute = require('./product')

app.use('/products', productRoute);



app.get('/', async (req, res) => {


    const template = handlebars.compile(fs.readFileSync('views/home.hbs', 'utf-8'));
    const result = template({}, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})

















const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.debug('Server is running ' + PORT);










