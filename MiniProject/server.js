var express = require('express');

var hbs = require('hbs');

var app = express();

var fs = require('fs');
const filename = 'product.txt';

const path = require('path');

var multer = require('multer');
const helpers = require('./helpers');
var count = 0;
// view engine
app.set('view engine','hbs');

// declare static folder
app.use(express.static(__dirname + '/public'));

// declare bodyparser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));


//storage 
const storage = multer.diskStorage({
    destination : function (req, file,cb){
        cb(null,'uploads/');
    },
    filename : function(req,file, cb){
        cb(null,file.filename + '-' + Date.now() + path.extname(file.originalname));
    }
})

hbs.registerPartials(__dirname + '/views/partials')


app.get('/' , (req,res) => {

    let productJson = getProductList();

    productJson.forEach(element => {
        console.log(element.id + '-' + element.name + '-' + element.price + '-' + element.description);
    });

    const template = hbs.compile(fs.readFileSync('views/product/index.hbs','utf-8'));
    const result = template({
        product : productJson
    })

    const content = result;
    res.render('partials/main.hbs', {
        content : content,
        products : productJson
        
    })
})


hbs.registerHelper('ProductList', () => {
    let productJson = getProductList();

    return productJson;
})

app.get('/addProduct' , (req,res) => {
    const content = hbs.compile(fs.readFileSync('views/product/add.hbs','utf-8'));
    res.render('partials/main.hbs', {
        content : content
    })
})

app.post('/addProductF',(req,res)=>{
   
    //let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('avatar');
    let result = '';
    let error = '';
    let name =  req.body.name;
    let price = req.body.price;
    let description = req.body.description.toString();
    let errorFound = false;
    let user = count + ':' + name + ':' + price + ':' + description;
    count++;
    

    // if(name.length <=3)
    //     error += "Name length >3";
    // if(error.length <=1000)
    //     error += "Giá phải lớn hơn 1000"
   
    // if(error != ''){
    //     errorFound = true;
    // }

    // if (errorFound != true){
        fs.appendFileSync(filename, user);
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




const PORT = process.env.PORT || 3000;

app.listen(PORT);

console.debug('Server is running ' + PORT);

function getProductList() {
    let file = fs.readFileSync(filename, 'utf-8');
    let products = file.split('\n');
    let productJson = [];

    products.forEach(element => {
        let id = element.split(':')[0];
        let nameF = element.split(':')[1];
        let priceF = element.split(':')[2];
        let descriptionF = element.split(':')[3];

        let product = {
            'id': id,
            'name': nameF,
            'priceF': priceF,
            'description': descriptionF,
        };

        productJson.push(product);

    });
    return productJson;
}

