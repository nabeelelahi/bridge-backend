const admin = require('../controllers/admin')
const callingAgent = require('../controllers/callingAgent')
const doctor = require('../controllers/doctor')
const sponsor = require('../controllers/sponsor')

const controllers = {
  admin,
  callingAgent,
  doctor,
  sponsor,
}

module.exports = controllers
