const { Router } = require("express");
const {
    get_allCompetitors,
    get_competitor,
    post_competitor
} = require("../controllers/competitor_controller");

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
    post_competitor
);
module.exports = router;