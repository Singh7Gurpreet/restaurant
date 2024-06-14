const express = require('express');
const router = express.Router();
const {verifyToken} = require('../../middleware/verification');
const userController = require('../userControllers');
const reservationController = require('../reservationController');
const {getName} = require('../../services/authentication/credentials');

router.get('/',userController.loginPage);
router.post('/signup',userController.signUpRequest);
router.post('/login',userController.loginRequest);
router.get('/menu',userController.options);
router.use('/reservation',verifyToken,reservationController);
module.exports = {router};