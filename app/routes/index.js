const admin = require('./admin')
const callingAgent = require('./callingAgent')
const sponsor = require('./sponsor')
const doctor = require('./doctor')

const routes = {
  admin,
  callingAgent,
  doctor,
  sponsor
}

module.exports = routes
