const { Router } = require("express");
const { get_AllHcp, create_hcp, update_hcp, filter_hcp, loginHcp } = require("../controllers/hcp_controllers");

const router = Router();

router.get(
    '/all/',
    get_AllHcp
);

router.post (
    '/',
    create_hcp
);

router.post (
    '/loginHcp/',
    loginHcp
)

router.put (
    '/:id',
    update_hcp
);

router.get (
    '/filter/',
    filter_hcp
)

module.exports = router;