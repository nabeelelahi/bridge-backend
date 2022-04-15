const { router } = require('../config/express')
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants')

const {
    services,
    servicesByCategory,
    servicesByType,
    requestAppointment,
    requestMedicine,
    requestLabTest,
    getPreviousOrders,
    getHER,
    getCombordites,
    getPrescription,
    getSponsorById,
    getUserStatus
} = require('../controllers').common

router.get(`${DEV_BASEURL}/common/GET/services`, services)

router.get(`${DEV_BASEURL}/common/GET/services-by-type/:type`, servicesByType)

router.get(`${DEV_BASEURL}/common/GET/services-by-category/:category`, servicesByCategory)

router.post(`${DEV_BASEURL}/common/POST/request-appointment`, requestAppointment)

router.post(`${DEV_BASEURL}/common/POST/request-medicine`, requestMedicine)

router.post(`${DEV_BASEURL}/common/POST/request-labtest`, requestLabTest)

router.get(`${DEV_BASEURL}/common/GET/previous-orders/:id/:buyerType/:categoryType`, getPreviousOrders)

router.get(`${DEV_BASEURL}/common/GET/her/:id`, getHER)

router.get(`${DEV_BASEURL}/common/GET/combordites/:id`, getCombordites)

router.get(`${DEV_BASEURL}/common/GET/prescription/:appointment_id`, getPrescription)

router.get(`${DEV_BASEURL}/common/GET/sponsor/:sponsor_id`, getSponsorById)

router.get(`${DEV_BASEURL}/common/GET/status/:userType/:id`, getUserStatus)

module.exports = router
