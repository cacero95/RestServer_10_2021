const { Router } = require("express");
const { get_AllHcp, create_hcp, update_hcp } = require("../controllers/hcp_controllers");

const router = Router();

router.get(
    '/all/',
    get_AllHcp
);

router.post (
    '/',
    create_hcp
);

router.put (
    '/:id',
    update_hcp
)

module.exports = router;