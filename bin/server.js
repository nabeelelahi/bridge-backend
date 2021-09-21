const  { App } = require('../app/config/express')  

const main = App()

const { admin, callingAgent,  doctor, sponsor } = require('../app/routes')

main.use(admin).use(callingAgent).use(doctor).use(sponsor)
