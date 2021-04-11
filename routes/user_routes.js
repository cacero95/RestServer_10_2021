const { Router } = require("express");
const { check } = require("express-validator");
const {
    get_allUsers,
    post_Users,
    get_user,
    put_user,
    delete_user 
} = require("../controllers/user_controllers");
const {
    validateRole,
    validatePermissionAdmin,
    validatePhone,
    validatePermissionUser
} = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validation_fields");

const router = Router();
router.get (
    '/all/',
    [
        check( 'role' ).custom( validateRole ),
        validatePermissionAdmin,
        validateFields
    ],
    get_allUsers
);
router.get (
    '/',
    get_user
)
router.post (
    '/',
    [
        check( 'email', 'El campo email es necesario' ).notEmpty(),
        check( 'email', 'El campo email no es valido' ).isEmail(),
        check (
            'phone',
            'El campo telefono domiciliario no es valido' 
        ).custom( validatePhone ),
        check( 'mobile', 'El campo mobile no es valido' ).isMobilePhone()
    ],
    post_Users
);
router.put (
    '/:id',
    [
        check( 'id', 'El campo id no es valido' ).isMongoId(),
        check( 'role' ).custom( validateRole ),
        validatePermissionUser,
        validateFields
    ],
    put_user
)
router.delete (
    '/:id',
    [
        check( 'role', 'El campo id no es valido' ).isMongoId(),
        check( 'role' ).custom( validateRole ),
        validatePermissionAdmin,
        validateFields
    ],
    delete_user
)

module.exports = router;