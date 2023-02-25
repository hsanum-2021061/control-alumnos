const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Alumno = require('../models/alumno');

const getAlumno = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaAlumnos = await Promise.all([
        Alumno.countDocuments(query),
        Alumno.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Alumno',
        listaAlumnos: listaAlumnos
    });

}

const postAlumnos = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, correo, password, rol} = req.body;
    const alumnoGuardadoDB = new Alumno({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    alumnoGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await alumnoGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Alumnos',
        alumnoGuardadoDB: alumnoGuardadoDB
    });

}


const putAlumno = async (req = request, res = response) => {

    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;
    const { _id,  /* rol,*/  estado, ...resto } = req.body;

    //Si la password existe o viene en el req.body, la encripta
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }
    const alumnoEditado = await Alumno.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        alumnoEditado
    });

}

const deleteAlumno = async(req = request, res = response) => {
    const { id } = req.params;
     const alumnoEliminado = await Alumno.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        alumnoEliminado: alumnoEliminado
    });
}

module.exports = {
    getAlumno: getAlumno,
    postAlumno: postAlumnos,
    putAlumno: putAlumno,
    deleteAlumno: deleteAlumno
}


// CONTROLADOR