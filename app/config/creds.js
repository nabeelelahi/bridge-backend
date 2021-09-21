function creds () {
  const allCreds = {
    DEV_dbCreds: {
      host: 'localhost',
      database: 'bridge',
      user:'root',
    },

    PROD_dbCreds: {
      host: '',
      user: '',
      password: '',
      database: '',
      debug: false
    },

    mailingCreds:{
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        // user:'silvertechsolutions19@gmail.com',
        // pass:'Power123!!'
        user:'samibirdge@gmail.com',
        pass:'Arsenalis6star'
      }
    }
  }
  return allCreds
}

module.exports = creds
