const User = require('../models/userModel')

exports.getHome = async(req, res) => {
    res.render('index')
}

exports.getSignUp = async(req, res) => {

    res.render('signup')
}

exports.postSignUp = async(req, res) => {
	if (!req.body.userName || !req.body.password) {
		res.render('signup', {err: "Please provide all credentials"})
		return
	}

	const user = new User({
		userName: req.body.userName,
		email: req.body.email,
		password: req.body.password
    })
    
	await user.save()
	.then(success => res.redirect(`/profile/?userName=${req.body.userName}`))
	.catch(error => {
	res.render('signup', { err: 'A user with that username or email already exists' });
})
} 

exports.getLogin = async(req, res) => {
    res.render('login')
}

exports.postLogIn = async(req, res) => {
	if (!req.body.userName || !req.body.password) {
		res.render('login', {err: "Please provide all credentials"})
		return
	}

	let user = await User.findOne({userName: req.body.userName})
	let password = await User.findOne({password: req.body.password})
	
	if (user && password != null) {
	res.redirect(`/profile/?userName=${req.body.userName}`)
	return
	}
	else if (password || user == null) {
	res.render('login', {err: "Incorrect Username or Password "})
	}
	else if (password == null) {
	res.render('login', {err: "Incorrect Password"})
	}
}

exports.getProfile = async(req, res) => {
    let user = await User.findOne({userName: req.query.userName})

    if (user == null) {
        res.render('profile', {err: "User doesn't exist"});
		return
	}

	res.render('profile', {user: user.toObject()});
}

exports.postProfile = async(req, res) => {
    res.render('profile')
}