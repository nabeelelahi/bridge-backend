function creds() {
  const allCreds = {
    DEV_dbCreds: {
      host: 'localhost',
      database: 'bridge',
      user: 'root',
    },
    PROD_dbCreds: {
      connectionLimit: 1000,
      connectTimeout: 60 * 60 * 1000,
      acquireTimeout: 60 * 60 * 1000,
      timeout: 60 * 60 * 1000,
      host: '64.31.43.178',
      user: 'bridgeco_dev_nabeel',
      password: 'Nabeel@2000',
      database: 'bridgeco_bridge_db',
      port: 3306,
      debug: false
    },

    mailingCreds: {
      host: 'mail.bridgeconnect.pk',
      port: 465,
      // address: '64.31.43.178',
      secure: true,
      auth: {
        user: 'no_reply@bridgeconnect.pk',
        pass: 'Bridge@123.'
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
