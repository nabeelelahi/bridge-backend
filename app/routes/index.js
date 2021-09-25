const admin = require('./admin')
const callingAgent = require('./callingAgent')
const sponsor = require('./sponsor')
const doctor = require('./doctor')
const beneficairy = require('./beneficiary')

const routes = {
  admin,
  callingAgent,
  doctor,
  sponsor,
  beneficairy
}

module.exports = routes
