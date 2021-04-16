const { Router } = require("express");
const { check } = require("express-validator");
const {
    get_allCompetitors,
    get_competitor,
    post_competitor,
    login_competitor,
    logout_competitor
} = require("../controllers/competitor_controller");
const { validateFields } = require("../middlewares/validation_fields");

const router = Router();

router.get (
    '/all/',
    get_allCompetitors
);

router.get (
    '/',
    get_competitor
);

router.post (
    '/',
    [
        check( 'address', 'El correo es requerido' ).notEmpty(),
        check( 'address', 'correo invalido' ).isEmail(),
        validateFields
    ],
    post_competitor
);

router.put (
    '/login/',
    [
        check( 'address', 'El correo es requerido' ).notEmpty(),
        check( 'address', 'Correo invalido' ).isEmail(),
        validateFields
    ],
    login_competitor
);

router.put (
    '/logout/:id',
    [
        check( 'id', 'id invalido' ).isMongoId(),
        validateFields
    ],
    logout_competitor
)

module.exports = router;