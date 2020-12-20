const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const helpers = require('./helpers');

const handlebars = require('handlebars');
const {
    MongoClient
} = require('mongodb');
const uri = "mongodb+srv://quocanh2105:quocanh123@waifuganktem.rwsm6.mongodb.net/miniproject?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function main() {
    try {
        await client.connect();

        console.log("Connected");
        // await listDatabases(client);
        // const collection = database.collection('product');
        // const option = {};
        // const query = {};
        // const product =  collection.find(query,option);
        // await product.forEach(element => {
        //     console.log(element);
        // })

    } catch (e) {
        console.error(e);
    }

}

function getDb() {
    const database = client.db('miniproject');
    return database;
}

function getList() {
    var db = getDb();
    const collection = db.collection('product');
    const option = {};
    const query = {};
    
    var product = collection.find(query, option);
    // })
    
    return product;
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};



async function printAllInCollect() {

}


main().catch(console.error);

const filename1 = 'product.txt';
var count = getProductList().length;

// declare bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: false
}));

// view engine
app.set('view engine', 'hbs');
var {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
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


app.get('/', (req, res) => {

    let productJson = getProductList();
    let productList = getList();
    productJson.pop();
    // productList.forEach(element => {
    //     let item = {
    //         'id': element.id,
    //         'name': element.name,
    //         'description': element.description,
    //         'avatar': element.avatar
    //     }
    //     products.push(new_item);
    // })
    let product = new Array();

    products = productList.map(function (element) {
        return {  'id': element.id,
        'name': element.name,
        'description': element.description,
        'avatar': element.avatar}
    })
    
    

    console.log(products.count);
    products.forEach(element => {
        console.log(element);
    })
    
    const template = handlebars.compile(fs.readFileSync('views/product/index.hbs', 'utf-8'));
    const result = template({
        product3 : products.toArray()
    },
    {
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

app.post('/addProductF', upload.single("avatar"), (req, res) => {
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

    let db = getDb();

    const collection = db.collection('product');

    const doc = {'id' : 5, 'name' : name, 'avatar' : avatar , 'description' : description};

    const is_insert = collection.insertOne(doc);


    // if(name.length <=3)
    //     error += "Name length >3";
    // if(error.length <=1000)
    //     error += "Giá phải lớn hơn 1000"

    // if(error != ''){
    //     errorFound = true;
    // }

    // if (errorFound != true){
    fs.appendFileSync(filename1, user);
    res.redirect('/');
    //}


    // if (req.fileValidationError) {
    //     error = req.fileValidationError;
    // }
    // else if (!req.file) {
    //     error = 'Cần chọn ảnh';
    // }
    // else if (err instanceof multer.MulterError) {
    //     error = err;
    // }
    // else if (err) {
    //     error = err;
    // }

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
