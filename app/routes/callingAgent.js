const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    callingAgentLogin,
    getSponsorProfileRequests,
    getSponsors
} = require('../controllers').callingAgent

router.post(`/${DEV_BASEURL}/callingAgent/POST/login`, callingAgentLogin)
router.get(`/${DEV_BASEURL}/callingAgent/GET/sponsor/pending-profile-requests`, getSponsorProfileRequests)
router.get(`/${DEV_BASEURL}/callingAgent/GET/sponsors`, getSponsors)

module.exports = router;
