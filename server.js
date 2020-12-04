var http = require('http');
var fs = require('fs');

var server = http.createServer((req,res)=>{
   if (req.url == '/' || req.url == '/index'){
       res.writeHead(200, { 'content-Type': 'text/html'});
       res.write('<html>');
        res.write('<body>');
        res.write('<h1 style="color:red">Hello world <br></h1>');
        res.write('<ol>');
        // res.write('<li>1</li>');
        // res.write('<li>2</li>');
        // res.write('<li>3</li>');
        for (var i = 0; i < 10; i++){
            res.write('<li>' + i + '</li>');
        }
        res.write('</ol>');
        res.write('<a href="/student">Go to home</a>')
        res.write('</body>');
        res.write('</html>'); 
        res.end('Xin chao ban123');
   }
   else if (req.url == '/student'){
    res.writeHead(200, { 'content-Type': 'text/html'});
        res.write('<html>');
        res.write('<body>');
        var data = fs.readFileSync('data.txt','utf-8');
        var reg = /[;,.\s]/;
        var strArray = data.split(reg);
        res.write('<ol>');

        strArray.forEach(element => {
            res.write('<li>' + element + '</li>' );
        });
        
        
        res.write('</ol>');
        res.write('<h1 style="color:red">Meo meo meo meo</h1>');
        res.write('</body>');
        res.end('</html>');
   }
   else {
    res.write('<html>');
    res.write('<body>');
   
    res.write('<h1 style="color:red">Ko ton tai</h1>');
    res.write('<a href="/">Go to home</a>')
    res.write('</body>');
    res.end('</html>');
   }
    
})


const PORT = 3000;
server.listen(PORT);