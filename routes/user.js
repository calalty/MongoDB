const {Router} = require('express')

const router = Router()

const userController = require('../controllers/userController')

router.get('/', userController.getHome)

router.get('/signup',userController.getSignUp)

router.post('/signup',userController.postSignUp)

router.get('/login', userController.getLogin)

router.post('/login', userController.postLogIn)

router.get('/profile', userController.getProfile)

router.post('/profile', userController.postProfile)


module.exports = router