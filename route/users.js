const express=require('express');
const router=require('express-promise-router')();
const passport=require('passport');
const passportConf=require('../passport');

const UserController=require('../controllers/users');
const {validateBody,schemas}=require('../helpers/routeHelper');

router.route('/signUp')
    .post(validateBody(schemas.authSchema),UserController.signUp);

router.route('/signIn')
    .post(validateBody(schemas.authSchema), passport.authenticate('local',{session:false}),UserController.signIn);

router.route('/secret')
    .get(passport.authenticate('jwt',{session:false}),UserController.secret);

module.exports=router;
