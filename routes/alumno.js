//Importaciones
const { Router } = require('express');
const { check } = require('express-validator');
const { getAlumno, postAlumno, putAlumno, deleteAlumno } = require('../controllers/alumno');
const { emailMaestroExiste, esRoleAlumnoValido, emailAlumnoExiste, existeAlumnoPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWTAlumno } = require('../middlewares/validar-jwt');
const { tieneRole } = require('../middlewares/validar-roles');

const router = Router();

router.get('/mostrar', getAlumno);

router.post('/agregar', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailAlumnoExiste ),
    check('correo').custom( emailMaestroExiste ),
    check('password', 'El password debe de ser más de 6 digitos').isLength( { min: 6 } ),
    check('rol').default('ROL_ALUMNO').custom(  esRoleAlumnoValido ),
    validarCampos,
] ,postAlumno);

router.put('/editar/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeAlumnoPorId ),
    check('rol').custom(  esRoleAlumnoValido ),
    validarCampos
] ,putAlumno);


router.delete('/eliminar/:id', [
    validarJWTAlumno,
    tieneRole('ROL_ALUMNO'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeAlumnoPorId ),
    validarCampos
] ,deleteAlumno);


module.exports = router;