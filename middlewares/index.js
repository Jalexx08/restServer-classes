

const  fieldValidate  = require('../middlewares/field-validate');
const  validateJWT  = require('../middlewares/validate-jwt');
const  validateRoles = require('../middlewares/validate-roles');

module.exports = {
    ...fieldValidate,
    ...validateJWT,
    ...validateRoles
}