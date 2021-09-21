const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    doctorLogin
} = require('../controllers').doctor

router.post(`/${DEV_BASEURL}/doctor/POST/login`, doctorLogin)

module.exports = router
