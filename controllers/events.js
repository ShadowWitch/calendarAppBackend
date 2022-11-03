
const {response, request} = require('express')

const Evento = require('../models/Evento')

const obtenerEvento = async (req = request, res = response) => {
    try {
       const data = await Evento.find()
                                .populate('user', 'name password')

       res.json({
        ok: true,
        data
    })
   } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: true,
            msg: 'Error al consultar los datos.',
        })
   }
    

}

const crearEvento = async (req = request, res = response) => {
    const data = req.body
    const evento = new Evento(data)

    // Agregando user que creo el registro
    evento.user = req.usuario.uid

    try {
        const eventoGuardado = await evento.save()
        res.json({
            ok: true,
            msg: 'registrado con exito',
            eventoGuardado
        })
    } catch (error) {
        res.status(500).json({
            ok: true,
            msg: 'No se pudo registrar',
        })
    }
}


const actualizarEvento = async (req = request, res = response) => {
    const idEvent = req.params.id
    
    try {

        const evento = await Evento.findById(idEvent)

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese usuario'
            })
        }

        // console.log(evento.user == req.usuario.uid)
        // console.log(evento.user === req.usuario.uid)
        // console.log(evento.user.toString() === req.usuario.uid)

        if(evento.user.toString() !== req.usuario.uid){ // Para que no me actualize registros que "EL MISMO HAYA INGRESADO"
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para actualizar ese registro'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: req.usuario.uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(idEvent, nuevoEvento, {new: true})

        res.json({
            ok: true,
            eventoActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el solicitud',
        })
    }

}

const eliminarEvento = async (req = request, res = response) => {

    const idEvent = req.params.id
    
    try {

        const evento = await Evento.findById(idEvent)

        if(!evento){
            return res.status(404).json({
                ok: false,
                msg: 'No existe ese usuario'
            })
        }

        if(evento.user.toString() !== req.usuario.uid){ // Para que no me elimine registros que "EL MISMO HAYA INGRESADO"
            return res.status(401).json({
                ok: false,
                msg: 'No tiene permiso para eliminar ese registro'
            })
        }
        
        const eventoEliminado = await Evento.findByIdAndDelete(idEvent)

        res.json({
            ok: true,
            eventoEliminado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error en el solicitud',
        })
    }
}



module.exports = {
    obtenerEvento,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}