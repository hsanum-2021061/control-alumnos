//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getMaestro, postMaestro, putMaestro, deleteMaestro } = require('../controllers/maestro');
const { esRoleMaestroValido, emailMaestroExiste, existeMaestroPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWTMaestro } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getMaestro);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailMaestroExiste ),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('rol').custom(  esRoleMaestroValido ),
    validarCampos,
] ,postMaestro);

router.put('/editar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    check('rol').custom(  esRoleMaestroValido ),
    validarCampos
] ,putMaestro);


router.delete('/eliminar/:id', [
    validarJWTMaestro,
    tieneRole('ROL_MAESTRO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeMaestroPorId ),
    validarCampos
] ,deleteMaestro);


module.exports = router;


// ROUTES