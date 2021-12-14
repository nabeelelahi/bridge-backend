function creds() {
  const allCreds = {
    DEV_dbCreds: {
      host: 'localhost',
      database: 'bridge',
      user: 'root',
    },

    PROD_dbCreds: {
      host: '',
      user: '',
      password: '',
      database: '',
      debug: false
    },

    mailingCreds: {
      service: 'Gmail',
      port: 25,
      secure: false,
      auth: {
        user:'nabeelelahi2000@gmail.com',
        pass:'html5css3js'
        // user:'silvertechsolutions19@gmail.com',
        // pass:'Power123!!'
        // user: 'ba@silvertechsolutions.net',
        // pass: 'JHwPMLyKVzOZ'
      },
      tls: {
        // do not fail on invalid certs
        rejectUnauthorized: false
      },
    }
  }
  return allCreds
}

module.exports = creds
