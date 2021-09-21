const { mail } = require("../services/mail")
const { sql } = require('../config/db')
const uid = require('../helpers/uid')
const pw = require('../helpers/pw')

const createSponsorProfileRequest = (req, res) => {
    const { name, email, phone, CNIC } = req.body
    console.log(req.body)
    sql.customQuery(
        `SELECT name, email, phone, CNIC, status FROM sponsor_profile_requests WHERE name = '${name}' OR email = '${email}' OR phone = '${phone}'`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: false, message: 'the provided credentials match to an already existing identity' })
            } else if (!isError && !result?.length) {
                sql.customQuery(`
       INSERT into sponsor_profile_requests (name, email, phone, CNIC)
       VALUES ('${name}', '${email}', '${phone}', '${CNIC}')              
       `, (result, isError) => {
                    if (!isError) {
                        res.json({ success: true, message: 'profile request sent successfully' })
                    } else {
                        res.json({ success: false, error: result })
                    }
                })

            } else {
                res.json({ success: false, error: result })
            }
        }
    )
    return res
}

const sponsorLogin = (req, res) => {
    const { email, password } = req.body
    console.log(req.body)
    sql.customQuery(
        `SELECT sid, name, email, phone, CNIC, status 
         FROM 
         sponsor 
         WHERE email = '${email}' 
         AND 
         password = '${password}'`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: true, data: result[0] })
            } else if (!isError && !result?.length) {
                res.json({ success: false, message: 'no identity corresponds to these credentials' })
            } else {
                res.json({ success: false, error: result })
            }
        }
    )
    return res
}

module.exports = {
    createSponsorProfileRequest,
    sponsorLogin
}