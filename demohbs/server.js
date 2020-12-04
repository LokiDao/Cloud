const express = require('express');
const hbs = require('hbs');

var app = express();
var fs = require('fs');



// import { parse } from 'node-html-parser';

// const engines = require('consolidate');
// app.engine('hbs', engines.handlebars);
// app.set('views', './views');
app.set('view engine', 'hbs');

hbs.registerPartials(__dirname + '/views/partials')
app.get('/' , (req,res) => {
    var currentYear =  new Date().getFullYear().toString();
   
    var abc = fs.readFileSync('./views/home.hbs','utf-8');

    const template = hbs.compile(abc);
   
    res.render('main', {
        pageTitle : 'Homepage',
        welcomeMessage : 'Welcome to our home',
        currentYear : currentYear,
        content : template,
        count : 2
        //, partials : {
        //     footer : 'partials/footer',
        //     header : 'partials/header',
        // }
    })
})


app.get('/about' , (req,res) => {
    var currentYear =  new Date().getFullYear().toString();
    var abc = fs.readFileSync('./views/about.hbs','utf-8')
    const template = hbs.compile(abc);
    //const root = parse(abc);
    res.render('main', {
        pageTitle : 'About',
        welcomeMessage : 'Welcome to our home',
        currentYear : currentYear,
        content : template
        //, partials : {
        //     footer : 'partials/footer',
        //     header : 'partials/header',
        // }
        
    })
})

app.get('/maintenance' , (req,res) => {
    var currentYear =  new Date().getFullYear().toString();

    res.render('main', {
        pageTitle : 'Maintenance',
        welcomeMessage : 'Maintenance',
        currentYear : currentYear,
        content : 'maintenance'
        //, partials : {
        //     footer : 'partials/footer',
        //     header : 'partials/header',
        // }
    })
})

hbs.registerHelper('getCurrentYear', () =>{
    return new Date().getFullYear();
})


hbs.registerHelper('CountUser', () => {
    var file = fs.readFileSync('user.txt','utf-8');

    var users = file.split('/');
    
    let userJson = [

    ];

    users.forEach(element => {
        let username = element.split('/')[0];
        let password = element.split('/')[1];
        let role = element.split('/')[2];
        let user = {
            'username' : username,
            'password' : password,
            'role' : role
        }
        userJson.push(user);
    });

    return userJson.length;
})

hbs.registerHelper('screamIt',(msg)=>{
    return msg.toUpperCase();
})

const PORT = process.env.PORT || 3000;

app.listen(PORT);
console.debug('Server is running.. ' + PORT);