const { response, request } = require('express');
const bcrypt = require('bcryptjs');
//Importación del modelo
const Maestro = require('../models/maestro');

const getMaestro = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaMaestro = await Promise.all([
        Maestro.countDocuments(query),
        Maestro.find(query)
    ]);

    res.json({
        msg: 'get Api - Controlador Maestro',
        listaMaestro: listaMaestro
    });

}

const postMaestro = async (req = request, res = response) => {

    //Desestructuración
    const { nombre, correo, password, rol } = req.body;
    const maestroGuardadoDB = new Maestro({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcrypt.genSaltSync();
    maestroGuardadoDB.password = bcrypt.hashSync(password, salt);

    //Guardar en BD
    await maestroGuardadoDB.save();

    res.json({
        msg: 'Post Api - Post Maestro',
        maestroGuardadoDB: maestroGuardadoDB
    });

}


const putMaestro = async (req = request, res = response) => {
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;
    if ( resto.password ) {
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        resto.password = bcrypt.hashSync(resto.password, salt);
    }

    //Editar al usuario por el id
    const maestroEditado = await Maestro.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'PUT editar user',
        maestroEditado
    });

}

const deleteMaestro = async(req = request, res = response) => {
    //Req.params sirve para traer parametros de las rutas
    const { id } = req.params;

     const maestroEliminado = await Maestro.findByIdAndUpdate(id, { estado: false });

    res.json({
        msg: 'DELETE eliminar user',
        maestroEliminado: maestroEliminado
    });
}

module.exports = {
    getMaestro: getMaestro,
    postMaestro: postMaestro,
    putMaestro: putMaestro,
    deleteMaestro: deleteMaestro
}