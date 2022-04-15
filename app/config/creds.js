function creds() {
  const allCreds = {
    DEV_dbCreds: {
      host: 'localhost',
      database: 'bridge',
      user: 'root',
    },

    // PROD_dbCreds: {
    //   host: 'designalpha99.com',
    //   user: 'designalpha99_bridge',
    //   password: 'Nabeel12345',
    //   database: 'designalpha99_bridge',
      // debug: true
    // },

    PROD_dbCreds: {
      host: 'bridgeconnect.pk',
      user: 'bridgeco_nabeel',
      password: 'Nabeel@2000',
      database: 'bridgeco_bridge_db',
      port: 3306,
      // debug: false
    },

    mailingCreds: {
      service: 'Gmail',
      port: 25,
      secure: true,
      auth: {
        user:'Nabeelelahi2000@gmail.com',
        pass:'Nabeel@2000'
        // user:'silvertechsolutions19@gmail.com',
        // pass:'Power123!!'
        // user:'nabeel2kkun@gmail.com',
        // pass:'html5css3js'
        // user: 'ba@silvertechsolutions.net',
        // pass: 'JHwPMLyKVzOZ'
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: true
      },
    }
  }
  return allCreds
}

module.exports = creds
