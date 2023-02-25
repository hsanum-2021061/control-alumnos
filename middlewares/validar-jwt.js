const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');

const validarJWTMaestro = async( req = request, res= response, next ) => {

    const token = req.header('x-token');

    //Si no viene el token
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    
    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_FOR_TOKEN);
       
        // leer al usuario que corresponda el uid
        const maestro = await Maestro.findById( uid );
        
        //Verificar si el uid del usuario no existe
        if ( !maestro ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }

        //Verufucar su ek uid tiene estado true
        if ( !maestro.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }


        req.maestro = maestro;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

const validarJWTAlumno = async( req = request, res= response, next ) => {

    const token = req.header('x-token');

    //Si no viene el token
    if ( !token ) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        })
    }

    
    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY_FOR_TOKEN);
       
        // leer al usuario que corresponda el uid
        const alumno = await Alumno.findById( uid );
        
        //Verificar si el uid del usuario no existe
        if ( !alumno ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB fisicamente'
            })
        }

        //Verufucar su ek uid tiene estado true
        if ( !alumno.estado ) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            })
        }


        req.alumno = alumno;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        })
    }


}

module.exports = {
    validarJWTMaestro,
    validarJWTAlumno
}
