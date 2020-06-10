const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://calalty:Ozzie123@cluster0-hhvk7.mongodb.net/users?retryWrites=true&w=majority', 
{useNewUrlParser: true, useUnifiedTopology: true});

const app = express()

const userRouter = require('./routes/user')

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: 'hbs'
}))

app.set('view engine', '.hbs')

app.use('/', userRouter)

app.listen(3100,  () => {
    console.log('Server 3100 is running')
})
