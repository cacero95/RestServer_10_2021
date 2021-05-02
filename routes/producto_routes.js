const { Router } = require("express");
const { get_allProductos, get_producto, post_producto } = require("../controllers/producto_controller");

const router = Router();

router.get (
    '/all/',
    get_allProductos
);

router.post (
    '/',
    post_producto
);

router.get (
    '/',
    get_producto
);

module.exports = router;