const { Router } = require("express");
const {
    get_allItems,
    post_item,
    get_item
} = require("../controllers/item_controller");

const router = Router();

router.get (
    '/all/',
    get_allItems
);

router.post (
    '/',
    post_item
);

router.get (
    '/',
    get_item
);

module.exports = router;