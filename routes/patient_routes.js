const { Router } = require("express");
const {
    get_allPatients,
    filter_patient,
    post_patient,
    update_patient,
    make_report,
    vaccinate,
    addSymptoms,
    filterPatientDateRange,
    filterPatientByHcp
} = require("../controllers/patient_controller");

const router = Router();

router.get (
    '/all/',
    get_allPatients
);

router.get (
    '/',
    filter_patient
);

router.get (
    '/report/',
    make_report
);

router.get (
    '/filterByDate/',
    filterPatientDateRange
);

router.get(
    '/filterByHcp',
    filterPatientByHcp
);

router.post (
    '/',
    post_patient
);

router.put (
    '/:id',
    update_patient
);

router.put (
    '/vaccinate/:id',
    vaccinate
);

router.put (
    '/symptoms/:id',
    addSymptoms
)

module.exports = router;