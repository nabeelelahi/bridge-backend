const express = require('express')
// const { sql } = require('../config/db')
const { DEV_BASEURL } = require('../config/constants')
const appRoot = `${__dirname
  .replace(/[\\]/gim, '/')
  .replace('/backend/app/config', '/backend')}`
const dirRoot = `${__dirname.replace(/[\\]/gim, '/').replace('/config', '')}`

module.exports = {
  router: express.Router(),

  App: () => {
    const app = express()

    const port = process.env.PORT || 9000

    const pathToViews = `${dirRoot}/views`

    app.set('trust proxy', true);

    app.set('view engine', 'ejs')

    app.set('views', pathToViews)

    app.use(express.json({ limit: '50mb' }))

    app.use(
      express.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 5000
      })
    )

    // middleware to avoid CORS ....
    app.use((req, res, next) => {
      res.header('Access-Control-Allow-Origin', process.env.ORIGIN || '*')
      res.header('Access-Control-Allow-Headers', '*')
      res.header('Access-Control-Allow-Methods', '*')

      next()
    })

    //Greet api
    app.get(`${DEV_BASEURL}/greet`, (req, res) => {
      res.render('greet')
      return res
    })

    // static folders
    app.use(
      '/' + DEV_BASEURL + '/public/uploads/',
      express.static(`${dirRoot}/public/uploads/`)
    )

    app.use(
      '/' + DEV_BASEURL + '/public/assets/',
      express.static(`${dirRoot}/public/assets/`)
    )

    // app.use((req, res, next) => {
    //   // console.log(req.originalUrl)
    //   if (!req.headers.authorization && req.originalUrl === '/' + DEV_BASEURL+'/admin/POST/login') {
    //     next();
    //   } else {
    //     if (!req.headers.authorization) {
    //       return res.status(403).json({ error: 'No credentials sent!' });
    //     } else {
    //       sql.customQuery(`SELECT * FROM session_maintainer WHERE session_token = '${req.headers.authorization}' AND session_ip != '${req.ip}'`, (result, isError) => {
    //         if (!isError && result?.length) {
    //           return res.status(403).json({ error: 'No multiple sessions allowed for same user.!' });
    //         } else if (!isError && !result?.length) {
    //           next();
    //         } else {
    //           return res.status(403).json({ error: 'No credentials sent!' });
    //         }
    //       })
    //     }
    //   }
    // })

    let server = app.listen(port, '0.0.0.0', e => {
      e
        ? console.log(`Server Cannot Start On Port ${port}`, e)
        : console.log(`Server Started On Port ${port}`)
    })

    // const io = require('socket.io').listen(server)

    // let { getSocket } = require('../models/Chat')

    // io.on('connection', socket => {
    //   console.log('We got a Socket', socket.id)
    //   getSocket(socket, io)
    // })

    return app
  },
}
