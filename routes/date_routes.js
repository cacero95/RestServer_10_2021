const { Router } = require("express");
const { 
    get_AllDates, 
    createDate, 
    filterByDateRange, 
    filterDate 
} = require("../controllers/date_controller");

const router = Router();

router.get (
    '/all/',
    get_AllDates
);

router.post (
    '/',
    createDate
);

router.get (
    '/filterDate/',
    filterByDateRange
);

router.get (
    '/filter/',
    filterDate
);


module.exports = router;