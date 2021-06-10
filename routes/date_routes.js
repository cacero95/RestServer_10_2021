const { Router } = require("express");
const { 
    get_AllDates, 
    createDate, 
    filterByDateRange, 
    filterDate,
    filterByPerson
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

router.post (
    '/filter/',
    filterDate
);

router.get (
    '/filterByPerson/',
    filterByPerson
)


module.exports = router;