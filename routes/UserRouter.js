const express = require('express');

const { login, authen, register, checkUser, changePassword, changeEmail} = require('../controllers/UserController');

const router = express.Router();

router.post('/login', login);
router.get('/authen', authen);
router.post('/register', register);
router.post('/checkuser', checkUser);
router.post('/changepassword', changePassword);
router.post('/changeemail', changeEmail);


module.exports = router;