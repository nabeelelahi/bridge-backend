const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    callingAgentLogin,
    getSponsors,
    getOrderRequests,
    approveOrderRequest,
} = require('../controllers').callingAgent

router.post(`${DEV_BASEURL}/callingAgent/POST/login`, callingAgentLogin)

router.get(`${DEV_BASEURL}/callingAgent/GET/sponsors`, getSponsors)

router.get(`${DEV_BASEURL}/callingAgent/GET/order-requests/:categoryType`, getOrderRequests)

router.put(`${DEV_BASEURL}/callingAgent/PATCH/approve-order/:id/:categoryType`, approveOrderRequest)

module.exports = router;
