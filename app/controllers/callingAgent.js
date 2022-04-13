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

const getOrder = (req, res) => {

    const { categoryType } = req.params

    let category;

    if (categoryType === "appointment") category = "purchased_appointments"

    if (categoryType === "medicine") category = "purchased_medicines"

    if (categoryType === "labtest") category = "purchased_labtests"

    sql.customQuery(
        `SELECT * FROM ${category}  WHERE status != 'PENDING'`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: true, data: result })
            } else if (!isError && !result?.length) {
                res.json({ success: false, message: "no requests found" })
            } else {
                res.json({ success: false, error: result })
            }
        }
    )
    return res
}

const getAllOrders = (req, res) => {

    const { categoryType } = req.params

    let category;

    if (categoryType === "appointment") category = "purchased_appointments"

    if (categoryType === "medicine") category = "purchased_medicines"

    if (categoryType === "labtest") category = "purchased_labtests"

    sql.customQuery(
        `SELECT * FROM ${category}`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: true, data: result })
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

    let query;

    let category;

    if (categoryType === "appointment") category = "purchased_appointments"

    if (categoryType === "medicine") category = "purchased_medicines"

    if (categoryType === "labtest") category = "purchased_labtests"

    
    if(req.body.date && req.body.time) {
       query = `UPDATE ${category} SET 
        status = 'SCHEDULED', 
        date = '${req.body.date}', 
        time = '${req.body.time}' WHERE id = '${id}'`
    }
    else query = `UPDATE ${category} SET status = 'SCHEDULED' WHERE id = '${id}'`

    console.log(query)

    sql.customQuery(
        query,
        (result, isError) => {
            if (!isError) {
                res.json({ success: true, message: 'Request Approved Successfully' })
            }
            else {
                res.json({ success: false, error: isError })
            }
        }
    )
    return res
}

const changeOrderStatus = (req, res) => {

    const { id, categoryType, status } = req.params

    let query;

    let category;

    if (categoryType === "appointment") category = "purchased_appointments"

    if (categoryType === "medicine") category = "purchased_medicines"

    if (categoryType === "labtest") category = "purchased_labtests"

    
    if(req.body.date && req.body.time) {
       query = `UPDATE ${category} SET 
        status = 'SCHEDULED', 
        date = '${req.body.date}', 
        time = '${req.body.time}' WHERE id = '${id}'`
    }
    else query = `UPDATE ${category} SET status = '${status}' WHERE id = '${id}'`

    sql.customQuery(
        query,
        (result, isError) => {
            if (!isError) {
                res.json({ success: true, message: 'Request Completed Successfully' })
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
    getOrder,
    getAllOrders,
    changeOrderStatus
}