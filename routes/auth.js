const { Router } = require('express');
const { check } = require('express-validator');

//Controllers
const { loginMaestro, loginAlumno } = require('../controllers/auth');
// Middlewares
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

//Manejo de rutas
router.post('/loginMaestro', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
] ,loginMaestro);

router.post('/loginAlumno', [
    check('correo', 'El correo no es valido').isEmail(),
    check('password', 'La password es obligatoria').not().isEmpty(),
    validarCampos,
] ,loginAlumno);


module.exports = router;