const { Router } = require("express")
const {validarJWT} = require('../middlewares/validar-jwt')
const {getEventos,crearEvento,actualizarEvento,eliminarEvento} = require('../controllers/events')
const {isDate} = require('../helpers/isDate')
const {check} = require('express-validator')
const { validarCampos } = require("../middlewares/validar-campos")
const router = Router()

//Todas tienes que pasar por la autenticación
router.use(validarJWT);

//Obtener eventos

router.get('/', getEventos) 



//Crear un nuevo Evento

router.post(
    '/',
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatorio').custom(isDate),
        check('end', 'Fecha de finalizacion es obligatorio').custom(isDate),
        validarCampos
    ]
    , crearEvento)

//Actualizar un evento

router.put('/:id', actualizarEvento)


//Borrar evento 

router.delete('/:id', eliminarEvento)


module.exports = router;