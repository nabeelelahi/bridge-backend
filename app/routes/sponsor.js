const { router } = require("../config/express");
const { DEV_BASEURL, PROD_BASEURL } = require("../config/constants");

const { requestForProfile, login, beneficiaries, newBeneficiary, renewSponsorShip } =
  require("../controllers").sponsor;

router.post(
  `${DEV_BASEURL}/sponsor/POST/request/create/profile`,
  requestForProfile
);

router.post(`${DEV_BASEURL}/sponsor/POST/login`, login);

router.get(`${DEV_BASEURL}/sponsor/GET/beneficiaries/:sponserId`, beneficiaries);

router.post(
  `${DEV_BASEURL}/sponsor/POST/register-beneficiary`,
  newBeneficiary
  );
  
  router.get(`${DEV_BASEURL}/sponsor/GET/renew-sponsorship/:id`, renewSponsorShip);

module.exports = router;
