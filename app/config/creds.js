function creds() {
  const allCreds = {
    DEV_dbCreds: {
      host: 'localhost',
      database: 'bridge',
      user: 'root',
    },
    PROD_dbCreds: {
      host: 'bridgeconnect.pk',
      user: 'bridgeco_nabeel',
      password: 'Nabeel@2000',
      database: 'bridgeco_bridge_db',
      port: 3306,
      // debug: false
    },

    mailingCreds: {
      host: 'bridgeconnect.pk',
      port: 465,
      secure: true,
      auth: {
        user: 'no_reply@bridgeconnect.pk',
        pass: 'bridge@123'
        // user: 'Nabeelelahi2000@gmail.com',
        // pass: 'Nabeel@2000'
        // user:'silvertechsolutions19@gmail.com',
        // pass:'Power123!!'
        // user:'nabeel2kkun@gmail.com',
        // pass:'html5css3js'
        // user: 'ba@silvertechsolutions.net',
        // pass: 'JHwPMLyKVzOZ'
      }
    }
  }
  return allCreds
}

module.exports = creds
