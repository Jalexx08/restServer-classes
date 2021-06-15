const { Router } = require("express");
const { check } = require('express-validator');

const { fieldValidate } = require('../middlewares/field-validate');

const { login } = require('../controllers/auth');



const router = Router();

router.post("/login",[
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    fieldValidate
], login );

module.exports = router;