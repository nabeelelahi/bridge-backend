const { router } = require('../config/express')
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants')

const {
    login
} = require('../controllers').guest

router.post(`${DEV_BASEURL}/guest/POST/login`, login)

module.exports = router
