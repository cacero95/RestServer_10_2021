const { Router } = require("express");
const { check } = require("express-validator");
const {
    get_allPatients,
    filter_patient,
    post_patient,
    update_patient,
    make_report,
    vaccinate,
    addSymptoms,
    filterPatientDateRange,
    filterPatientByHcp,
    filterPatientPostVacuantion,
    loginPatient
} = require("../controllers/patient_controller");
const { validateFields } = require("../middlewares/validation_fields");

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
    '/filterByHcp/',
    filterPatientByHcp
);

router.post (
    '/',
    [
        check( 'email', 'El correo es requerido' ).notEmpty(),
        check( 'email', 'El correo no es valido' ).isEmail(),
        check( 'number_document', 'el numero de documento es requerido' )
        .notEmpty(),
        validateFields
    ],
    post_patient
);

router.post (
    '/loginPatient/',
    [
        check( 'email', 'el correo es requerido' ).notEmpty(),
        check( 'email', 'correo valido' ).isEmail(),
        check( 'number_document', 'el numero de documento es requerido' )
        .notEmpty(),
    ],
    loginPatient
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

router.get (
    '/postVa/',
    filterPatientPostVacuantion
)

module.exports = router;