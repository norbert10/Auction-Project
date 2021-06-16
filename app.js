const express = require('express');
var bodyParser = require('body-parser')
const app = express();
var v = false;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/auth',(req, res) => {
    v=true;
    console.log(req.body)
    res.redirect('/index')
});

function verify(req,res,next) {
    if (v) {
        next();
    } else {
        res.redirect('/login');
    }
}

app.get('/',verify, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/login',(req, res) => {
    res.sendFile(__dirname + '/login.html')
});
app.get('/help',verify, (req, res) => {
    res.sendFile(__dirname + '/help.html')
});
app.get('/index',verify, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/auction',verify, (req, res) => {
    res.sendFile(__dirname + '/auction.html')
});


app.listen(5000, () => {
    console.log('Server started at port 5000');
})

