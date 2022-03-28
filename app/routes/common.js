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
    getHER 
} = require('../controllers').common

router.get(`${DEV_BASEURL}/common/GET/services`, services)

router.get(`${DEV_BASEURL}/common/GET/services-by-type/:type`, servicesByType)

router.get(`${DEV_BASEURL}/common/GET/services-by-category/:category`, servicesByCategory)

router.post(`${DEV_BASEURL}/common/POST/request-appointment`, requestAppointment)

router.post(`${DEV_BASEURL}/common/POST/request-medicine`, requestMedicine)

router.post(`${DEV_BASEURL}/common/POST/request-labtest`, requestLabTest)

router.get(`${DEV_BASEURL}/common/GET/previous-orders/:id/:buyerType/:categoryType`, getPreviousOrders)

router.get(`${DEV_BASEURL}/common/GET/her/:id`, getHER)

module.exports = router
