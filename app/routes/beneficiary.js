const { router } = require('../config/express')
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants')

const {
    beneficairyLogin
} = require('../controllers').beneficairy

router.post(`/${DEV_BASEURL}/beneficiary/POST/login`, beneficairyLogin)

module.exports = router
