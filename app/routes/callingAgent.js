const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    callingAgentLogin,
    getSponsors,
    getOrderRequests,
    approveOrderRequest,
    getOrder,
    getAllOrders,
    changeOrderStatus
} = require('../controllers').callingAgent

router.post(`${DEV_BASEURL}/callingAgent/POST/login`, callingAgentLogin)

router.get(`${DEV_BASEURL}/callingAgent/GET/sponsors`, getSponsors)

router.get(`${DEV_BASEURL}/callingAgent/GET/order-requests/:categoryType`, getOrderRequests)

router.get(`${DEV_BASEURL}/callingAgent/GET/order/:categoryType`, getOrder)

router.get(`${DEV_BASEURL}/callingAgent/GET/all-order/:categoryType`, getAllOrders)

router.put(`${DEV_BASEURL}/callingAgent/PATCH/approve-order/:id/:categoryType`, approveOrderRequest)

router.put(`${DEV_BASEURL}/callingAgent/PUT/order-status/:id/:categoryType/:status`, changeOrderStatus)

module.exports = router;
