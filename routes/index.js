const express = require('express');
const { bcrypt_example, bcrypt_login, bcrypt_sign } = require('../controllers/bcrypt_Controllers');
const { jwt_sign, jwt_verify, jwt_decode } = require('../controllers/jwt_Controllers');
const { github_details } = require('../controllers/github_controllers');

const router = express.Router();

router.get('/bcrypt', bcrypt_example);
router.post('/bcrypt/sign', bcrypt_sign);
router.post('/bcrypt/login', bcrypt_login);
router.post('/jwt-sign', jwt_sign);
router.post('/jwt-verify', jwt_verify);
router.post('/jwt-decode', jwt_decode);
router.get('/githubdetail/:username', github_details);


module.exports = router;  // Default Export