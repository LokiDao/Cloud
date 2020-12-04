var express = require('express');

var app = express();
var path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extende: false }));

app.get('/',(req,res)=> {
    // res.write('Hello');
    res.sendFile(path.join(__dirname) + '/index.html');
})

var fs = require('fs');
var filename = 'data.txt';
var filename2 = 'data2.txt';
app.get('/show',(req,res)=> {
    // res.write('Hello');
    let data = fs.readFileSync(filename, 'utf-8');
    res.write('<html>');
    res.write('<body>');
    var regex = /[;,.\s]/;
    res.write('<ul>');
    
    
    data.split(regex).forEach(element => {
        res.write('<li>' + element + '</li>');
    });
    
    res.write('</ul>');
    res.write('</html>');
    res.write('</body>');
    res.end();
    
});

app.get('/add', (req,res) => {
    res.sendFile(path.join(__dirname) + '/add.html');
})


app.post('/doAdd', (req,res) => {
    let name = req.body.name;
    fs.appendFileSync(filename, ';' + name);
    res.redirect('/show');
});

app.get('/addProduct', (req,res) => {
    res.sendFile(path.join(__dirname) + '/addProduct.html' );
})

app.post('/doAddProduct', (req,res) => {
    let name = req.body.name;
    let price = req.body.price;

    let product = name + ';' + price;

    fs.appendFileSync(filename2, ' / ' + product);
    res.redirect('/showProduct');
})

app.get('/showProduct',(req,res)=> {
    // res.write('Hello');
    let data = fs.readFileSync(filename2, 'utf-8');
    res.write('<html>');
    res.write('<body>');
    var regex = '/';
    res.write('<ul>');
    
    
    data.split(regex).forEach(element => {
        res.write('<li>' + element + '</li>');
    });
    
    res.write('</ul>');
    res.write('</html>');
    res.write('</body>');
    res.end();
    
});


var PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug("Server is running " + PORT);
