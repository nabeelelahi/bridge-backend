const  { App } = require('../app/config/express')  

const main = App()

const { admin, callingAgent,  doctor, sponsor, beneficairy, guest } = require('../app/routes')

main.use(admin).use(callingAgent).use(doctor).use(sponsor).use(beneficairy).use(guest)
