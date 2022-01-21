const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    login,
    getPatients,
    updateHER
} = require('../controllers').doctor

router.post(`/${DEV_BASEURL}/doctor/POST/login`, login)

router.get(`/${DEV_BASEURL}/doctor/GET/patients/:id/:userType`, getPatients)

router.post(`/${DEV_BASEURL}/doctor/POST/update-HER`, updateHER)

module.exports = router
