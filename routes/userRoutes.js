const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const {verifyToken} = require('../middleware/verification');

router.get('/',userController.loginPage);
router.post('/signup',userController.signUpRequest);
router.post('/login',userController.loginRequest);
router.get('/menu',userController.options);
router.get('/reservation',verifyToken,userController.reservationRequest);

module.exports = {router};