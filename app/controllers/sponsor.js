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

const getAllBeneficiaries = (req, res) => {

    const { sid } = req.params

    sql.customQuery(
        `SELECT bid, name, email, phone, CNIC, sid FROM beneficiary WHERE sid = '${sid}'`,
        (result, isError) => {
            if (!isError && result?.length) {
                res.json({ success: true, beneficiaries: result })
            } else if (!isError && !result?.length) {
                res.json({ success: false, message: 'No beneficiaries registered' })
            } else {
                res.json({ success: false, error: result })
            }
        }
    )
    return res
}

const registerBeneficiary = (req, res) => {

    const {
        name,
        email,
        phone,
        CNIC,
        age,
        gender } = req.body

    const { sid } = req.params

    const password = pw(16)

    console.log(req.body, 'body')

    console.log(req.params, 'params')

    sql.customQuery(`SELECT * FROM beneficiary WHERE email = '${email}'`, (searchResult, searchError) => {
        if (!searchError && !searchResult?.length  ) {
            sql.customQuery(`
            INSERT INTO beneficiary (bid, name, email, phone, password, CNIC, age, gender, sid)
            VALUES ('${uid(16, 'BB-')}','${name}', '${email}', '${phone}', '${password}', '${CNIC}', '${age}', '${gender}', '${sid}')`,
                (result, isError) => {
                    if (!isError) {
                        mail("profile-creation-beneficiary", { email, password }).then((isEmailSent) => {
                            console.log(isEmailSent, "Email Sent Response")
                            res.json({
                              success: true,
                              message: `beneficiary profile created successfully and email has been sent to ${email}`
                            })
                          })
                    } else {
                        res.json({ success: false, error: result })
                    }
                })
        }
        else if (!searchError && searchResult?.length) {
            res.json({ success: false, message: 'that provided email already belongs to an identity!' })
        }
        else {
            res.json({ success: false, error: result })
        }
    })
    return res
}

module.exports = {
    createSponsorProfileRequest,
    sponsorLogin,
    getAllBeneficiaries,
    registerBeneficiary
}