/*
    Rutas Usuarios
    host + /api/events 
*/

const express = require('express')
const router = express.Router()

const {check} = require('express-validator')

// Controllers
const { obtenerEvento, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events')
const { validarJWt } = require('../middlewares/validar-jwt')

const {validarCampos} = require('../middlewares/validar-campos')
const { isDate } = require('../helpers/isDate')

router.use(validarJWt) //* Todo lo que le sigue abajo tendra que tener su token (por eso lo puse arriba de todo)

// Obtener eventos
router.get('/', obtenerEvento)

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El titulo es requerido').not().isEmpty(),
        check('start', 'La fecha de inicio es requerida').custom(isDate),
        check('end', 'La fecha de finalizacion es requerida').custom(isDate),
        validarCampos
    ], 
    crearEvento)

// Actualizar evento
router.put('/:id', actualizarEvento)

// Eliminar evento
router.delete('/:id', eliminarEvento)


module.exports = router