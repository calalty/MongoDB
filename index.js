const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')

const mongoose = require('mongoose');

const User = require('./models/userModel')

mongoose.connect('mongodb+srv://calalty:Ozzie123@cluster0-hhvk7.mongodb.net/users?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const app = express()

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs')

app.get('/', async(req, res) => {
    res.render('index')
})

app.get('/signup', async(req, res) => {

    res.render('signup')
})

app.post('/signup', async(req, res) => {
    let user = new User({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email
    })
    
    await user.save()
 
    res.redirect(`/profile/?userName=${req.body.userName}`)
})

app.get('/login', async(req, res) => {
    res.render('login')
})

app.post('/login', async(req, res) => {
    res.render('login')
})

app.get('/profile', async(req, res) => {
	let user = await User.findOne({userName: req.query.userName})
	res.render('profile', {user: user.toObject()});
});

app.post('/profile', async(req, res) => {
    res.render('profile')
})

app.listen(3100,  () => {
    console.log('Server 3100 is running')
})
