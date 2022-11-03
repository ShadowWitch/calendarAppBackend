
const {response, request} = require('express')

const jwt = require('jsonwebtoken')

const validarJWt = (req = request, res = response, next) => {
    const token = req.header('authorization')
    
    // console.log('TOKEN > ', token)

    if(!token){
        res.status(401).json({
            ok: false,
            msg: 'Not authenticated.'
        })
    }
    
    // jwt.verify(token, process.env.SEED, (err, payload) =>{
    //     if(err){
    //         console.log('ERRORASO >> ', err)
    //         return res.json({
    //             ok: false,
    //             msg: 'Not valid tokennn'
    //         })
    //     }

    //     console.log('Mi payload >> ', payload)
    // })

    try {
        const {uid, name} = jwt.verify(
            token, 
            process.env.SEED
        )
        // console.log('CNSOLA >> ', process.env.SEED)
        
        req.usuario = {
            uid,
            name,
            token
        }   

        // console.log(req.usuario)

    } catch (error) {
        // console.log('ERRORRRR >> ', error)
        return res.status(401).json({
            ok: false,
            msg: 'Not valid token.'
        })
    }

    next()
}


module.exports = {
    validarJWt
}