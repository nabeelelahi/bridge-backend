const { router } = require('../config/express')
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants')

const {
    services,
    servicesByCategory,
    servicesByType
} = require('../controllers').common

router.get(`/${DEV_BASEURL}/common/GET/services`,  services)

router.get(`/${DEV_BASEURL}/common/GET/services-by-type/:type`,  servicesByType)

router.get(`/${DEV_BASEURL}/common/GET/services-by-category/:type/:category`,  servicesByCategory)

module.exports = router
