const express = require('express');
const supplier_router = express.Router();
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const app = express();
const uri = "mongodb+srv://quocanh2105:quocanh123@waifuganktem.rwsm6.mongodb.net/miniproject?retryWrites=true&w=majority";
const mongo = require('mongodb');
const {MongoClient} = require('mongodb');



supplier_router.get('/index', async (req,res) => {
    const template = handlebars.compile(fs.readFileSync('views/categories/index.hbs', 'utf-8'));
    const result = template({
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })

    res.render('partials/main.hbs', {
        content: result
    })
})

supplier_router.get('/add', async (req,res) => {
    const template = handlebars.compile(fs.readFileSync('views/categories/create.hbs', 'utf-8'));
    const result = template({
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})



supplier_router.get('/view', async (req,res) => {
    const template = handlebars.compile(fs.readFileSync('views/categories/view.hbs', 'utf-8'));
    const result = template({
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})


supplier_router.get('/update', async (req,res) => {
    const template = handlebars.compile(fs.readFileSync('views/categories/update.hbs', 'utf-8'));
    const result = template({
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false
    })

    res.render('partials/main.hbs', {
        content: result
    })
})


module.exports = supplier_router;