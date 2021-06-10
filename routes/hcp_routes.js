const { Router } = require("express");
const { check } = require("express-validator");
const { get_AllHcp, create_hcp, update_hcp, filter_hcp, loginHcp } = require("../controllers/hcp_controllers");
const { validateFields } = require("../middlewares/validation_fields");

const router = Router();

router.get(
    '/all/',
    get_AllHcp
);

router.post (
    '/',
    [
        check( 'email', 'El correo es requerido' ).notEmpty(),
        check( 'email', 'El correo no es valido' ).isEmail(),
        check( 'number_document', 'el numero de documento es requerido' )
        .notEmpty(),
        validateFields
    ],
    create_hcp
);

router.post (
    '/loginHcp/',
    [
        check( 'email', 'correo valido' ).isEmail(),
        check( 'email', 'el correo es requerido' ).notEmpty(),
        check( 'number_document', 'el numero de documento es requerido' )
        .notEmpty(),
        validateFields
    ],
    loginHcp
)

router.put (
    '/:id',
    [
        check( 'id', 'El id no es valido' ).isMongoId(),
        validateFields
    ],
    update_hcp
);

router.get (
    '/filter/',
    filter_hcp
);

module.exports = router;