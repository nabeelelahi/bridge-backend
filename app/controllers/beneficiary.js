const { mail } = require("../services/mail")
const { sql } = require('../config/db')
const uid = require('../helpers/uid')
const pw = require('../helpers/pw')

const beneficairyLogin = (req, res) => {

    const { email, password } = req.body

    console.log(req.body)

    sql.customQuery(
        `SELECT 
        id, 
        name, 
        email, 
        phone, 
        CNIC, 
        sponsor_id, 
        status, 
        assigned_doctorId,
        valid_from, 
        valid_till 
         FROM 
         beneficiary 
         WHERE email = '${email}' 
         OR phone = '${email}'
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
    beneficairyLogin
}