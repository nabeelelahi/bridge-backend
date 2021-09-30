const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
    createSponsorProfileRequest,
    sponsorLogin,
    getAllBeneficiaries,
    registerBeneficiary
} = require('../controllers').sponsor

router.post(`/${DEV_BASEURL}/sponsor/POST/requests/create/profile`, createSponsorProfileRequest)

router.post(`/${DEV_BASEURL}/sponsor/POST/login`, sponsorLogin)

router.post(`/${DEV_BASEURL}/sponsor/POST/register-beneficiary/:sid`, registerBeneficiary)

router.get(`/${DEV_BASEURL}/sponsor/GET/beneficiaries/:sid`, getAllBeneficiaries) 

module.exports = router
