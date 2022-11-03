
const moment = require('moment')

const isDate = (value) => {
    // console.log({value, location, path})

    if(!value){
        return false // Campo incorrecto
    }

    const fecha = moment(value)
    if(fecha.isValid()) {
        return true
    }else{
        return false
    }
}

module.exports = {
    isDate
}