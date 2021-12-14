const admin = require('../controllers/admin')
const callingAgent = require('../controllers/callingAgent')
const doctor = require('../controllers/doctor')
const sponsor = require('../controllers/sponsor')
const beneficairy = require('../controllers/beneficiary')
const guest = require('../controllers/guest')
const common = require('../controllers/common')

const controllers = {
  admin,
  callingAgent,
  doctor,
  sponsor,
  beneficairy,
  guest,
  common
}

module.exports = controllers
