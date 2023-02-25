const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/generar-jwt');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');

const loginMaestro = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verficiar si el email existe
        const maestro = await Maestro.findOne({ correo });
        if ( !maestro ) {
            return res.status(400).json({
                msg: 'Maestro / Password no son correctos - (El correo no existe)'
            });
        }

        if ( !maestro.estado ) {
            return res.status(400).json({
                msg: 'Maestro / Password no son correctos - Estado: false'
            });
        }
        
        //Verificar la password
        const validarPassword = bcrypt.compareSync( password, maestro.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Maestro / Password no son correctos - (password incorrecta)'
            });
        }

        //Generar JWT
        const token = await generarJWT( maestro.id );

        res.json({
            msg: 'Login PATH',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }



}

const loginAlumno = async (req = request, res = response) => {

    const { correo, password } = req.body;

    try {

        //Verficiar si el email existe
        const alumno = await Alumno.findOne({ correo });
        if ( !alumno ) {
            return res.status(400).json({
                msg: 'Alumno / Password no son correctos - (El correo no existe)'
            });
        }

        if ( !alumno.estado ) {
            return res.status(400).json({
                msg: 'Alumno / Password no son correctos - Estado: false'
            });
        }
        
        //Verificar la password
        const validarPassword = bcrypt.compareSync( password, alumno.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'Alumno / Password no son correctos - (password incorrecta)'
            });
        }

        //Generar JWT
        const token = await generarJWT( alumno.id );

        res.json({
            msg: 'Login PATH',
            correo, password,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador (BackEnd)'
        });
    }



}

module.exports = {
    loginMaestro: loginMaestro,
    loginAlumno: loginAlumno
}