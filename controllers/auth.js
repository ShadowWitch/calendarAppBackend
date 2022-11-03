
const {response, request} = require('express') //* Solo para que me autocomplete cuando escriba "res." (para poner el intelligense)
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req = request, res = response) => {
    const {email, password} = req.body;

    try {
        let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Ese usuario ya existe.'
            })
        }

        usuario = new Usuario(req.body)
        //* Encriptar Password
        usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(5))

        //* Guardar Usuario
        await usuario.save()

        //* Logear y generar el token
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario.id,
            usuario: usuario.name,
            token
        })
    } catch (error) {
        console.log(error)

        res.status(500).json({
            ok: false,
            msg: 'Error al registrar'
        })
    }

}

const loginUsuario = async (req = request, res = response) => {
    const {email='', password=''} = req.body;

    try {
        const usuario = await Usuario.findOne({email})

        if(!usuario){
            return res.status(400).json({
                ok: false,
                msg: 'Ese usuario no existe.'
            })
        }

        //* Confirm password
        const validPassword = bcrypt.compareSync(password, usuario.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'Password not valid'
            })
        }

        //* Generar Token (esta vez con una funcion que devuelva una promesa)
        const token = await generarJWT(usuario.id, usuario.name)

        res.json({
            ok: true,
            uid: usuario.id,
            email: usuario.email,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error al logearse'
        })   
    }
}


const revalidarToken = async (req, res = response) => {
    const {uid, name} = req.usuario

    //* Generar nuevo token
    const token = await generarJWT(uid, name)

    res.json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
}

