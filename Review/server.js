var express = require('express')
var app= express()




const engines = require('consolidate');
app.engine('hbs',engines.handlebars);
app.set('views','./views');
app.set('view engine','hbs');

//cho phep doc du lieu tu Textbox
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/public'))

var fs = require('fs');
var fileName = 'data.txt';

app.post('/doLogin',(req,res)=>{
    let nameF = req.body.txtName;
    let passwordF = req.body.txtPassword;
    let file = fs.readFileSync(fileName,'utf8');
    let users = file.split('/');
    let found= false;
    //bo user dau tien
    users.shift();
    users.forEach(element => {
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        if(nameF == name && passwordF == password){
            found = true;
            //break;
        }
    });
    if(found)
        res.end('Valid user')
    else
        res.end('Invalid user Name and Password')
})

app.get('/login',(req,res)=>{
    res.render('login')
})

app.post('/doRegister',(req,res)=>{
    //lay thong tin tu Textbox
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let user = name + ':' + password;
    let errorNameMsg = null;
    let errorPasswordMsg = null;
    if(name.length <=3)
        errorNameMsg = "Name length >3";
    if(password.length <=6)
        errorPasswordMsg = "Password length>6"
    let errorFound = false;
    if(errorNameMsg !=null || errorPasswordMsg !=null ){
        errorFound = true;
    }
    if(errorFound){//Neu loi xay ra
        let errorMsg ={
            'name': errorNameMsg,
            'password' : errorPasswordMsg
        }
        res.render('update',{error:errorMsg})

    }else{//Cap nhat file
        
        res.redirect('/');
    }   

   
})

app.get('/register',(req,res)=>{
    res.render('register');
})

app.get('/',(req,res)=>{
    res.render('index');
})

app.get('/view',(req,res)=>{
    let nameF = req.body.txtName;
    let passwordF = req.body.txtPassword;
    var userJson = readFileToArray();   
    res.render('view',{model : userJson})

})


app.get('/update', (req,res) => {
    let username = req.query.user;
    let userJson = readFileToArray();
    let indexToUpdate =-1;
    for(i=0;i<userJson.length;i++){
        if(userJson[i].name == username){
            indexToUpdate = i;
            var oldname = userJson[i].name;
            var oldpass = userJson[i].password;
            break;
        }
    }

    console.log(oldname + oldpass);

    res.render('update', {name: oldname, password :oldpass})

})



app.post('/doUpdate',(req,res) => {
    let name = req.body.txtName;
    let password = req.body.txtPassword;
    let username = req.query.user;

    // let errorNameMsg = null;
    // let errorPasswordMsg = null;
    // if(name.length <=3)
    //     errorNameMsg = "Name length >3";
    // if(password.length <=6)
    //     errorPasswordMsg = "Password length>6"
    // let errorFound = false;
    // if(errorNameMsg !=null || errorPasswordMsg !=null ){
    //     errorFound = true;
    // }
    // if(errorFound){//Neu loi xay ra
    //     let errorMsg ={
    //         'name': errorNameMsg,
    //         'password' : errorPasswordMsg
    //     }
    //     res.render('register',{error:errorMsg})

    // }else{//Cap nhat file
        
        let userJson = readFileToArray();
        // let indexToUpdate =-1;
        for(i=0;i<userJson.length;i++){
            if (userJson[i].name == username){
                userJson[i].name = name;
                userJson[i].password = password       
                break;
            }
        }
        


        let contentToUpdate = '';
        userJson.forEach(element => {
            contentToUpdate += '/' + element.name + ':'+  element.password;
        });
        fs.writeFileSync(fileName,contentToUpdate);
        res.redirect('/');
    // }
})


app.get('/delete',(req,res)=>{
    //lay user can xoa
    let user = req.query.user;
    //1.doc file len mang
    let userJson = readFileToArray();
    //2.xoa user trong mang
    let indexToDelete =-1;
    for(i=0;i<userJson.length;i++){
        if(userJson[i].name == user){
            indexToDelete = i;
            break;
        }
    }

    if(indexToDelete !=-1){
        userJson.splice(indexToDelete,1);
    }else{
        console.debug("User is invalid");
    }
    //3.cap nhat file tu Memory vao File
    let contentToUpdate = '';
    userJson.forEach(element => {
        contentToUpdate += '/' + element.name + ':'+  element.password;
    });
    fs.writeFileSync(fileName,contentToUpdate);
    res.redirect('/');

})

const PORT = process.env.PORT || 3000;
app.listen(PORT);
console.debug('Server is runing..' + PORT);

function readFileToArray() {
    let file = fs.readFileSync(fileName, 'utf8');
    let users = file.split('/');
    let userJson = [];
    //bo user dau tien
    users.shift();
    users.forEach(element => {
        let name = element.split(':')[0];
        let password = element.split(':')[1];
        let user = {
            'name': name,
            'password': password
        };
        userJson.push(user);
    });
    return userJson;
}
