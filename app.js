const express = require('express');
var bodyParser = require('body-parser')
const mysql = require('mysql')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var v = false;


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/auth', (req, res) => {
    v = true;
    console.log(req.body)
    res.redirect('/index')
});

function verify(req, res, next) {
    if (v) {
        next();
    } else {
        res.redirect('/login');
    }
}
//logout 
app.get('/kill', verify, (req, res) => {
    v=false;
    res.redirect('/login')
});
//routes
app.get('/', verify, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html')
});
app.get('/help', verify, (req, res) => {
    res.sendFile(__dirname + '/help.html')
});
app.get('/index', verify, (req, res) => {
    res.sendFile(__dirname + '/index.html')
});
app.get('/auction', verify, (req, res) => {
    res.sendFile(__dirname + '/auction.html')
});

app.listen(5000, () => {
    console.log('Server started at port 5000');
})

//mysql connection
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'auction'

})
db.getConnection((error) => {
    if (error) {
        console.log(error)
    } else {
        console.log("mysql connected...")
    }
})

//get all users
app.post('/logindetails', (req, res) => {
    const { username, pass } = req.body
    console.log(req.body);
    db.query(`SELECT EXISTS(SELECT * FROM auction.USER WHERE email = "${username}" AND pass = "${pass}" ) As Isavailable;`, (error, result, fields) => {
        if (error) throw error;
        if (result[0].Isavailable) {
            v = true;
            res.redirect("/index")
        } else {
            res.redirect('/login')
        }
    })

});

//registration
app.post('/registration', (req, res) => {
    const { fname, lname, pass, cpass, phone, email } = req.body;
    if (pass != cpass) { res.end("Password not matching") }
    else {
        db.query(`INSERT INTO USER(firstname,lastname,pass,phone,email) VALUES('${fname}','${lname}','${pass}','${phone}','${email}');`, (error, result, fields) => {
            if (error) throw error;
            res.redirect('/login');
        });
    }

})
