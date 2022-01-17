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

const getOrderRequests = (req, res) => {

    const { categoryType } = req.params

    let category;

    if (categoryType === "appointment") category = "purchased_appointments"

    if (categoryType === "medicine") category = "purchased_medicines"

    if (categoryType === "labtest") category = "purchased_labtests"

    sql.customQuery(
        `SELECT * FROM ${category}  WHERE status = 'PENDING'`,
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

const approveOrderRequest = (req, res) => {

    const { id, categoryType } = req.params

    let category;

    if (categoryType === "appointment") category = "purchased_appointments"

    if (categoryType === "medicine") category = "purchased_medicines"

    if (categoryType === "labtest") category = "purchased_labtests"

    sql.customQuery(
        `UPDATE ${category} SET status = 'APPROVED' WHERE id = '${id}'`,
        (result, isError) => {
            if (!isError) {
                res.json({ success: true, message: 'Request Approved successfully' })
            }
            else {
                res.json({ success: false, error: isError })
            }
        }
    )
    return res
}

module.exports = {
    callingAgentLogin,
    getSponsors,
    getOrderRequests,
    approveOrderRequest,
}