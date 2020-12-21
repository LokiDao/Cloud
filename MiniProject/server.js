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

async function main(){
    
   
}

const filename1 = 'product.txt';
var count = getProductList().length;

// declare bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

// view engine
app.set('view engine', 'hbs');
var {
    allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access');
const { MongoClient } = require('mongodb');
// declare static folder
app.use(express.static(__dirname + '/public'));
//storage 




const storage = multer.diskStorage({
    destination: function (req, file, cb) { // kiem tra xxem file co dc cham nhan hay ko
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, req.body.name + '-' + Date.now() + path.extname(file.originalname));
    }
})

hbs.registerPartials(__dirname + '/views/partials')


app.post('/doSearch', async (req,res) => {
    let client = await MongoClient.connect(uri);
    let db = client.db('miniproject');
    let collection = db.collection('product');

    let name = new RegExp(req.body.search);
    
    var condition = {'name' : name};
    var products = await collection.find(condition).toArray();
    console.log(condition);
    const template = handlebars.compile(fs.readFileSync('views/product/index.hbs', 'utf-8'));
    const result = template({
        product3: products
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })

    res.render('partials/main.hbs', {
        content: result
    })

})

app.get('/delete',async  function (req, res) {
    let client = await MongoClient.connect(uri);
    let db = client.db('miniproject');
    let collection = db.collection('product');
    let id = req.query.id;
    var o_id = new mongo.ObjectID(id); 
    var condition = {'_id' : o_id};
    var is_remove = await collection.removeOne(condition);
    
    res.redirect('/');
})

app.get('/', async (req, res) => {
    let client = await MongoClient.connect(uri);
    let db = client.db('miniproject');
    let productJson = getProductList();
    //let productList = getList();
    productJson.pop();
    // const
    //     MongoClient = require('mongodb').MongoClient;
   
    let collection = db.collection('product');
    const option = {};
    const query = {};

    var products = await collection.find({}).toArray();

    console.log(products.count);
    products.forEach(element => {
        console.log(element);
    })

    const template = handlebars.compile(fs.readFileSync('views/product/index.hbs', 'utf-8'));
    const result = template({
        product3: products
    }, {
        allowProtoMethodsByDefault: false,
        allowProtoPropertiesByDefault: false

    })

    res.render('partials/main.hbs', {
        content: result
    })
})


handlebars.registerHelper('ProductList', () => {
    let productJson = getProductList();

    return productJson;
})

app.get('/addProduct', (req, res) => {
    const content = handlebars.compile(fs.readFileSync('views/product/add.hbs', 'utf-8'));
    res.render('partials/main.hbs', {
        content: content
    })
})
var upload = multer({
    storage: storage
});

app.post('/addProductF', upload.single("avatar"), async (req, res) => {
    let avatar = req.file.filename;
    let result = '';
    let error = '';
    let name = req.body.name;
    // let file = req.file.avatar;
    let price = req.body.price;
    let description = req.body.description;
    let errorFound = false;
    let user = count + ':' + name + ':' + price + ':' + avatar + ':' + description;

    console.log(user);

    let client = await MongoClient.connect(uri);
    let db = client.db('miniproject');

    const collection = db.collection('product');

    const doc = {
        'name': name,
        'avatar': avatar,
        'description': description,
        'price' : price
    };

    const is_insert = collection.insertOne(doc);

    fs.appendFileSync(filename1, user);
    res.redirect('/');


})

app.get('/update', function (req, res) {
    let id = req.query.id;
    console.log(id);
    let productJson = getProductList();
    productJson.pop();
    var product = [];

    productJson.forEach(element => {
        if (element.id == id) {
            product = {
                'id': element.id,
                'name': element.name,
                'price': element.price,
                'description': element.description
            }
        }
    });

    const template = handlebars.compile(fs.readFileSync('views/product/update.hbs', 'utf-8'));
    const result = template({
        product: productList
    })

    res.render('partials/main.hbs', {
        content: result
    })
})






app.get('/view', async (req,res) => {
    var id = req.query.id;
    const client = await MongoClient.connect(uri , { useUnifiedTopology: true });
    const db = client.db('miniproject');
    console.log(id);
    const collection = db.collection('product');
   
    var o_id = new mongo.ObjectID(id); 
    console.log(o_id);
    var condition = {'_id' : o_id};
    var product = await collection.findOne(condition);
    
    const template = handlebars.compile(fs.readFileSync('views/product/view.hbs', 'utf-8'));
    const result = template({
        product: product
    })

    res.render('partials/main.hbs', {
        content: result
    })

})





const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.debug('Server is running ' + PORT);











function getProductList() {
    let file = fs.readFileSync(filename1, 'utf-8');
    let products = file.split('\n');
    let productJson = [];

    products.forEach(element => {
        let id = element.split(':')[0];
        let nameF = element.split(':')[1];
        let priceF = element.split(':')[2];
        let descriptionF = element.split(':')[4];
        let avatar = element.split(':')[3];

        let product = {
            'id': id,
            'name': nameF,
            'price': priceF,
            'description': descriptionF,
            'avatar': element.split(':')[3]
        };
        // console.log(product);
        productJson.push(product);

    });


    return productJson;
}