const { Router } = require("express");
const { get_allMuebles, post_mueble } = require("../controllers/muebles_controllers");

const router = Router();

router.get (
    '/all/',
    get_allMuebles
);

router.post (
    '/',
    post_mueble
);

module.exports = router;