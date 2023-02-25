const { Router } = require('express');
const { check } = require('express-validator');

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT, validarJWTMaestro, validarJWTAlumno } = require('../middlewares/validar-jwt');
const { tieneRole, esAdminRole, tieneRoleAlumno } = require('../middlewares/validar-roles');

//Controllers
const { postCurso, putCurso, deleteCurso, getCurso, getCursoPorId, putAsignacion } = require('../controllers/curso');

const { existeCursoPorId } = require('../helpers/db-validators');

const router = Router();

//Manejo de rutas
router.get('/mostrar', getCurso );

router.get('/mostrar/:id', [
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('id').custom( existeCursoPorId ),
    validarCampos
],  getCursoPorId);

router.post('/agregar', [
    validarJWTMaestro,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ROL_MAESTRO'),
    validarCampos
], postCurso);

router.put('/editar/:id', [
    validarJWTMaestro,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    tieneRole('ROL_MAESTRO'),
    validarCampos
], putCurso);

router.delete('/eliminar/:id', [
    validarJWTMaestro,
    esAdminRole,
    check('id', 'No es un id de Mongo Válido').isMongoId(),
    tieneRole('ROL_MAESTRO'),
    validarCampos
], deleteCurso);

router.put('/asignar-alumno/:idCurso', [
    validarJWTAlumno,
    tieneRoleAlumno('ROL_ALUMNO'),
    validarCampos
], putAsignacion);



module.exports = router;