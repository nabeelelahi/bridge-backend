const admin = require('./admin')
const callingAgent = require('./callingAgent')
const sponsor = require('./sponsor')
const doctor = require('./doctor')
const beneficairy = require('./beneficiary')
const guest = require('./guest')
const common = require('./common')

const routes = {
  admin,
  callingAgent,
  doctor,
  sponsor,
  beneficairy,
  guest,
  common
}

module.exports = routes
