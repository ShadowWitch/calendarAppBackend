
/*
    Rutas Usuarios
    host + /api/auth 
*/

const express = require('express')
const router = express.Router()

const {check} = require('express-validator')

// Controller
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth')

// Middlewares
const { validarCampos } = require('../middlewares/validar-campos')
const { validarJWt } = require('../middlewares/validar-jwt')


// Http request

router.post(
    '/new', 
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ],  
    crearUsuario)


router.post(
    '/', 
    [
        check('email', 'El email es requerido').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({min: 6}),
        validarCampos
    ], 
    loginUsuario)


router.get('/renew', validarJWt, revalidarToken)



module.exports = router
