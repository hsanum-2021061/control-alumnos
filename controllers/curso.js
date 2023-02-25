const { request, response, json } = require('express');
const Curso = require('../models/curso');

const getCurso = async (req = request, res = response) => {

    //condiciones del get
    const query = { estado: true };

    const listaCursos = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .populate('alumnos', 'nombre')
            .populate('maestro', 'nombre')
    ]);

    res.json({
        msg: 'Lista de cursos activos',
        listaCursos
    });

}


const getCursoPorId = async (req = request, res = response) => {

    const { id } = req.params;
    const cursoById = await Curso.findById(id)
        .populate('alumno', 'nombre')
        .populate('maestro', 'nombre');

    res.status(201).json(cursoById);

}


const postCurso = async (req = request, res = response) => {

    const { estado, maestro, ...body } = req.body;

    const cursoDB = await Curso.findOne({ nombre: body.nombre });

    if (cursoDB) {
        return res.status(400).json({
            msg: `El curso ${cursoDB.nombre}, ya existe en la DB`
        });
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        maestro: req.maestro._id
    }

    const curso = await Curso(data);

    //Guardar en DB
    await curso.save();

    res.status(201).json(curso);

}


const putCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const { estado, maestro, ...restoData } = req.body;

    if (restoData.nombre) {
        restoData.nombre = restoData.nombre.toUpperCase();
        restoData.maestro = req.maestro._id;
    }

    const MaestroActualizado = await Curso.findByIdAndUpdate(id, restoData, { new: true });

    res.status(201).json({
        msg: 'Put Controller Producto',
        MaestroActualizado
    })

}

const deleteCurso = async (req = request, res = response) => {

    const { id } = req.params;
    const cursoEliminado_ = await Curso.findByIdAndUpdate(id, { estado: false }, { new: true });

    res.json({
        msg: 'DELETE',
        cursoEliminado_
    })

}

const putAsignacion = async (req = request, res = response) => {

    const { idCurso } = req.params;
    const { _id, password, correo, estado, maestro, ...restoData } = req.body;

    const asignacionActualizado = await Curso.findByIdAndUpdate(idCurso, restoData);

    res.status(201).json({
        msg: 'Put Controller Producto',
        asignacionActualizado
    })

}




module.exports = {
    postCurso,
    putCurso,
    deleteCurso,
    getCurso,
    getCursoPorId,
    putAsignacion
}