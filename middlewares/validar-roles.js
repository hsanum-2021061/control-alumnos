const { request, response } = require('express');

//Verificador si es admin
const esAdminRole = (req = request, res = response, next) => {

    //Si no viene el usuario
    if ( !req.maestro ) {
        return res.status(500).json({
            msg: 'Se require verificar el role sin validar el token primero'
        });
    }

    //Verificar que el rol sea ADMIN_ROLE
    const { rol, nombre } = req.maestro;

    if ( rol !== 'ROL_MAESTRO' ) {
        return res.status(500).json({
            msg: `${ nombre } no es un Profesor - No tiene acceso a esta función`
        });
    }

    next();


}


//Operador rest u operador spread 
const tieneRole = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.maestro) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes( req.maestro.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}

const tieneRoleAlumno = ( ...roles ) => {

    return (req = request, res= response, next) => {

        if (!req.alumno) {
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if (!roles.includes( req.alumno.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles: ${ roles }`
            })

        }

        next();

    }

}


module.exports = {
    tieneRole,
    tieneRoleAlumno,
    esAdminRole
}