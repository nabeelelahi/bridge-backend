const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    createSponsorProfileRequest,
    sponsorLogin
} = require('../controllers').sponsor

router.post(`/${DEV_BASEURL}/sponsor/POST/requests/create/profile`, createSponsorProfileRequest)
router.post(`/${DEV_BASEURL}/sponsor/POST/login`, sponsorLogin)

module.exports = router
