const { router } = require('../config/express') 
const { DEV_BASEURL, PROD_BASEURL } = require('../config/constants') 

const {
  loginAdmin,
  getAllSponsor,
  getSponsorProfileRequestsPending,
  acceptSponsorProfileRequest,
  rejectSponsorProfileRequest,
  createCallingAgentProfile,
  createDoctorProfile,
  getAllDoctor,
  getAllCallingAgent,
  terminateSponsor,
  terminateDoctor,
  terminateCallingAgent,
  getAllBeneficiaries,
  activateCallingAgent,
  activateDoctor,
  activateSponsor
} = require('../controllers').admin

router.get(`/${DEV_BASEURL}/admin/GET/all-sponsors`, getAllSponsor)

router.get(`/${DEV_BASEURL}/admin/GET/all-doctors`, getAllDoctor)

router.get(`/${DEV_BASEURL}/admin/GET/all-callingAgents`, getAllCallingAgent)

router.get(`/${DEV_BASEURL}/admin/GET/all-beneficiaries`, getAllBeneficiaries)

router.post(`/${DEV_BASEURL}/admin/POST/login`, loginAdmin)

router.get(`/${DEV_BASEURL}/admin/GET/sponsor/profile-requests`, getSponsorProfileRequestsPending)

router.put(`/${DEV_BASEURL}/admin/PUT/accept/sponsor/profile/request`, acceptSponsorProfileRequest)

router.put(`/${DEV_BASEURL}/admin/PUT/reject/sponsor/profile/request`, rejectSponsorProfileRequest)

router.post(`/${DEV_BASEURL}/admin/POST/create/new/calling-agent`, createCallingAgentProfile)

router.post(`/${DEV_BASEURL}/admin/POST/create/new/doctor`, createDoctorProfile)

router.put(`/${DEV_BASEURL}/admin/PUT/terminate-sponsor/:sid`, terminateSponsor)

router.put(`/${DEV_BASEURL}/admin/PUT/terminate-doctor/:did`, terminateDoctor)

router.put(`/${DEV_BASEURL}/admin/PUT/terminate-calling-agent/:caid`, terminateCallingAgent)

router.put(`/${DEV_BASEURL}/admin/PUT/activate-sponsor/:sid`, activateSponsor)

router.put(`/${DEV_BASEURL}/admin/PUT/activate-doctor/:did`, activateDoctor)

router.put(`/${DEV_BASEURL}/admin/PUT/activate-calling-agent/:caid`, activateCallingAgent)

// router.post(`/${BASE_URL}/POST/admin/account/password/reset/link`, generateResetAdminPasswordLink)

// router.get(`/${BASE_URL}/GET/admin/account/password/reset`, renderResetPasswordAdminView)

// router.patch(`/${BASE_URL}/PATCH/admin/account/password/reset`, resetPasswordAdmin)

module.exports = router
