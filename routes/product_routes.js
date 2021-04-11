const { Router } = require("express");
const { check } = require("express-validator");
const {
    get_allProducts,
    post_product,
    get_Product,
    put_product,
    delete_product 
} = require("../controllers/product_controllers");
const { validatePermissionAdmin, validateRole } = require("../helpers/dbValidations");
const { validateFields } = require("../middlewares/validation_fields");

const router = Router();

router.get(
    '/all/',
    get_allProducts
);
router.get(
    '/',
    get_Product
);
router.put(
    '/:id',
    [
        check( '/id', 'No es un Id valido' ).isMongoId(),
        check( 'role' ).custom( validateRole ),
        validatePermissionAdmin,
        validateFields
    ],
    put_product
);
router.post (
    '/',
    [
        check( 'role' ).custom( validateRole ),
        validatePermissionAdmin,
        validateFields
    ],
    post_product
);
router.delete (
    '/:id',
    [
        check( 'role' ).custom( validateRole ),
        validatePermissionAdmin,
        validateFields
    ],
    delete_product
)

module.exports = router;