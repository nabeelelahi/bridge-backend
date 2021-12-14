const { mail } = require("../services/mail")
const { sql } = require('../config/db')
const uid = require('../helpers/uid')
const pw = require('../helpers/pw')

const callingAgentLogin = (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    sql.customQuery(
        `SELECT * FROM calling_agent WHERE email = '${email}' AND password = '${password}'`,
        (result, isError) => {
            if (!isError && result?.length) {
                // const token = jwt.getToken({}, email+password, '1d' )
                delete result[0].password
                res.json({ success: true, message: 'callingAgent logged in', data: result[0] })
            } else if (!isError && !result?.length) {
                res.json({ success: false, message: 'No such record' })
            } else {
                res.json({ error: result })
            }
        }
    )
    return res
}

const getSponsorProfileRequests = (req, res) => {
    sql.customQuery(
        `SELECT name, email, phone, CNIC, status FROM sponsor_profile_requests WHERE status = 'PENDING' OR status = 'REJECTED'`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: true, requests: result })
            } else if (!isError && !result?.length) {
                res.json({ success: false, message: "no requests found" })
            } else {
                res.json({ success: false, error: result })
            }
        }
    )
    return res
}

const getSponsors = (req, res) => {
    sql.customQuery(
        `SELECT sid,name,email,CNIC,status FROM sponsor`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: true, requests: result })
            } else if (!isError && !result?.length) {
                res.json({ success: false, message: "no requests found" })
            } else {
                res.json({ success: false, error: result })
            }
        }
    )
    return res
}

module.exports = {
    callingAgentLogin,
    getSponsorProfileRequests,
    getSponsors
}