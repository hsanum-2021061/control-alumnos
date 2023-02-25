const { Schema, model } = require('mongoose');

const cursoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    maestro: {
        type: Schema.Types.ObjectId,
        ref: 'Maestro'
    },
    alumnos: [{
        type: Schema.Types.ObjectId,
        ref: 'Alumno'
    }]
});

module.exports = model('Curso', cursoSchema);
