const { router } = require('../config/express')
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants')

const {
    services
} = require('../controllers').common

router.get(`/${DEV_BASEURL}/common/GET/services`,  services)

module.exports = router
