const Role = require('../models/role');
const Maestro = require('../models/maestro');
const Alumno = require('../models/alumno');

//Este archivo maneja validaciones personalizadas

const esRoleMaestroValido = async( rol = 'ROL_MAESTRO' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}

const esRoleAlumnoValido = async( rol = 'ROL_ALUMNO' ) => {

    const existeRol = await Role.findOne( { rol } );

    if ( !existeRol ) {
        throw new Error(`El rol ${ rol } no está registrado en la DB`);
    }

}

const emailMaestroExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Maestro.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const emailAlumnoExiste = async( correo = '' ) => {

    //Verificamos si el correo ya existe en la DB
    const existeEmail = await Alumno.findOne( { correo } );

    //Si existe (es true) lanzamos excepción
    if ( existeEmail ) {
        throw new Error(`El correo: ${ correo } ya existe y esta registrado en la DB`);
    }

}

const existeMaestroPorId = async(id) => {

    //Verificar si el ID existe
    const existeUser = await Maestro.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeAlumnoPorId = async(id) => {

    //Verificar si el ID existe
    const existeUser = await Alumno.findById(id);

    if ( !existeUser ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}

const existeCursoPorId = async(id) => {

    //Verificar si el ID existe
    const existeCurso = await Curso.findById(id);

    if ( !existeCurso ) {
        throw new Error(`El id ${ id } no existe en la DB`);
    }

}



module.exports = {
    emailAlumnoExiste,
    existeMaestroPorId,
    existeAlumnoPorId,
    existeCursoPorId,
    esRoleMaestroValido,
    esRoleAlumnoValido,
    emailMaestroExiste,
}