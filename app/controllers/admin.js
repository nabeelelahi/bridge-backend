const { mail } = require("../services/mail")
const { sql } = require('../config/db')
const uid = require('../helpers/uid')
const pw = require('../helpers/pw')
const jwt = require('../helpers/jwt')

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  sql.customQuery(
    `SELECT * FROM admin WHERE email = '${email}' AND password = '${password}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        // const token = jwt.getToken({}, email+password, '1d' )
        // console.log(email, password);
        delete result[0].password
        res.json({ success: true, message: 'admin logged in', data: result[0] })
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: 'No such admin' })
      } else {
        res.json({ error: result })
      }
    }
  )

  // sql.customQuery(`
  // INSERT 
  // INTO 
  // session_maintainer 
  // (session_id, session_token, session_ip, session_start, session_expire ) 
  // VALUES ('${uid(16, 'BSESS-')}', '${token}', '${req.ip}', '${new Date()}', '${oneDayAheadCurrentDate(new Date())}'
  // )`, (result,isError)=>{
  //   if(!isError){
  //     res.json({ message: 'admin logged in', data: result[0], authToken:token })
  //   }else{
  //     res.json({ error: result })    
  //   }
  // })

  return res
}

const getSponsorProfileRequestsPending = (req, res) => {
  sql.customQuery(
    `SELECT name, email, phone, CNIC, status FROM sponsor_profile_requests WHERE status = 'PENDING'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, requests: result })
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: 'No requests found' })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res
}

const getAllSponsor = (req, res) => {
  sql.customQuery(
    `SELECT sid, name, email, phone, CNIC, status, createdAt FROM sponsor`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, sponsors: result })
      }
      else if (!isError && !result?.length) {
        res.json({ success: false, message: 'No sponser registered yet' })
      }
      else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res
}

const getAllBeneficiaries = (req, res) => {
  sql.customQuery(
    `SELECT bid, name, email, phone, CNIC, age, gender, sid, status FROM beneficiary`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, beneficiaries: result })
      }
      else if (!isError && !result?.length) {
        res.json({ success: false, message: 'No beneficiaries registered yet' })
      }
      else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res
}

const getAllDoctor = (req, res) => {
  sql.customQuery(
    `SELECT did, name, email, phone, gender, address, clinicName, speciality, pmdcNumber, availability, createdAt, status FROM doctor`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, doctors: result })
      }
      else if (!isError && !result?.length) {
        res.json({ success: false, message: 'No sponser registered yet' })
      }
      else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res
}

const getAllCallingAgent = (req, res) => {
  sql.customQuery(
    `SELECT caid, name, email, phone, gender, CNIC, salary, qualification, shiftTiming, createdAt, status FROM calling_agent`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, callingAgents: result })
      }
      else if (!isError && !result?.length) {
        res.json({ success: false, message: 'No sponser registered yet' })
      }
      else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res
}


const terminateSponsor = (req, res) => {

  const { sid } = req.params

  sql.customQuery(
    `UPDATE sponsor
     SET status = 'TERMINATED'
     WHERE sid = '${sid}'`,
    (result, isError) => {
      if (!isError) {
        console.log("sponser updated")
        sql.customQuery(
          `UPDATE beneficiary
           SET status = 'TERMINATED'
           WHERE sid = '${sid}'`, (benResult, benError) => {
          if (!benError) {
            console.log("beneficiary updated")
            res.json({ success: true, message: "Sponsor and it's beneficiaries has been terminated" })
          }
          else {
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

const terminateDoctor = (req, res) => {

  const { did } = req.params

  sql.customQuery(
    `UPDATE doctor
    SET status = 'TERMINATED'
    WHERE did = '${did}'`,
    (result, isError) => {
      if (!isError) {
        res.json({ success: true, message: result })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )

  return res
}

const terminateCallingAgent = (req, res) => {

  const { caid } = req.params
  
  sql.customQuery(
    `UPDATE calling_agent 
    SET status = "TERMINATED" 
    WHERE caid = '${caid}'`,
    (result, isError) => {
      if (!isError) {
        res.json({ success: true, message: result })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )

  return res
}

const activateSponsor = (req, res) => {

  const { sid } = req.params

  sql.customQuery(
    `UPDATE sponsor
     SET status = 'ACTIVE'
     WHERE sid = '${sid}'`,
    (result, isError) => {
      if (!isError) {
        console.log("sponser updated")
        sql.customQuery(
          `UPDATE beneficiary
           SET status = 'ACTIVE'
           WHERE sid = '${sid}'`, (benResult, benError) => {
          if (!benError) {
            console.log("beneficiary updated")
            res.json({ success: true, message: "Sponsor and it's beneficiaries has been activated" })
          }
          else {
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

const activateDoctor = (req, res) => {

  const { did } = req.params

  sql.customQuery(
    `UPDATE doctor
    SET status = 'ACTIVE'
    WHERE did = '${did}'`,
    (result, isError) => {
      if (!isError) {
        res.json({ success: true, message: result })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )

  return res
}

const activateCallingAgent = (req, res) => {

  const { caid } = req.params

  sql.customQuery(
    `UPDATE calling_agent 
    SET status = "ACTIVE" 
    WHERE caid = '${caid}'`,
    (result, isError) => {
      if (!isError) {
        res.json({ success: true, message: result })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )

  return res
}

const acceptSponsorProfileRequest = (req, res) => {
  const { email } = req.body
  sql.customQuery(`SELECT name, email, phone, CNIC, status FROM sponsor_profile_requests WHERE email = '${email}' AND status = 'PENDING'`,
    (result, isError) => {
      const password = pw(16)
      if (!isError && result?.length) {
        mail("profile-creation-sponsor", { email, password }).then((isEmailSent) => {
          console.log(isEmailSent, "Email Sent Response")
          if (isEmailSent) {
            sql.customQuery(
              `INSERT INTO sponsor (sid, name, email, password, phone, CNIC, status)
           VALUES ('${uid(16, 'BS-')}', '${result[0].name}', '${result[0].email}', '${password}', '${result[0].phone}', '${result[0].CNIC}', 'ACCEPTED')`,
              (result, isError) => {
                if (!isError) {
                  sql.customQuery(
                    `DELETE FROM sponsor_profile_requests
                     WHERE email = '${email}' AND status = 'PENDING'`,
                    (result, isError) => {
                      if (!isError) {
                        res.json({
                          success: true,
                          message: `sponsor profile accepted successfully and email has been sent to ${email}`
                        })
                      } else {
                        res.json({ success: false, error: result })
                      }
                    }
                  )
                } else {
                  res.json({ error: result })
                }
              }
            )
          }
        })
          .catch(err => console.log(err))
      } else {
        res.json({ success: false, error: result })
      }
    })
  return res
}

const rejectSponsorProfileRequest = (req, res) => {
  const { email } = req.body

  sql.customQuery(
    `UPDATE sponsor_profile_requests
     SET status = 'REJECTED'
     WHERE email = '${email}' AND status = 'PENDING'`,
    (result, isError) => {
      if (!isError) {
        res.json({ success: true, message: 'sponsor profile rejected successfully' })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )

  return res
}

const createCallingAgentProfile = (req, res) => {

  const {
    name,
    email,
    phone,
    CNIC,
    gender,
    qualification,
    salary,
    shiftTiming
  } = req.body

  const password = pw(16)

  sql.customQuery(`SELECT * FROM calling_agent WHERE email = '${email}'`, (result, isError) => {
    if (!isError && !result?.length) {
      sql.customQuery(
        `INSERT INTO calling_agent (caid,name,email,password,phone,CNIC,gender,qualification,salary,shiftTiming,status)
         VALUES ('${uid(16, 'BAD-')}', '${name}', '${email}', '${password}', '${phone}', '${CNIC}', '${gender}', '${qualification}', '${salary}', '${JSON.stringify(shiftTiming)}', 'ACCEPTED')`,
        (result, isError) => {
          if (!isError) {
            mail("profile-creation-callingAgent", { email, password }).then((isEmailSent) => {
              console.log(isEmailSent, "Email Sent Response")
              res.json({
                success: true,
                message: `calling agent profile created successfully and email has been sent to ${email}`
              })
            })
          } else {
            res.json({ success: false, error: result })
          }
        }
      )
    }
    else if (!isError && result?.length) {
      res.json({ success: false, message: 'that provided email already belongs to an identity!' })
    }
    else {
      res.json({ success: false, error: result })
    }
  })

  return res
}

const createDoctorProfile = (req, res) => {
  const { address, speciality, clinicName, email, gender, name, phone, pmdcNumber, availability } = req.body

  const password = pw(16)

  sql.customQuery(`SELECT * FROM doctor WHERE email = '${email}'`, (result, isError) => {
    if (!isError && !result?.length) {

      mail("profile-creation-callingAgent", { email, password }).then((isEmailSent) => {
        console.log(isEmailSent, "Email Sent Response")
        if (isEmailSent) {
          sql.customQuery(
            `INSERT INTO doctor (did, name, email, password, phone, gender, address, clinicName, availability, speciality, pmdcNumber, status)
             VALUES ('${uid(16, 'BD-')}', '${name}', '${email}', '${password}', '${phone}', '${gender}', '${address}', '${clinicName}', '${JSON.stringify(availability)}', '${speciality}', '${pmdcNumber}', 'ACCEPTED')`,
            (result, isError) => {
              if (!isError) {
                res.json({
                  success: true,
                  message: `doctor profile created successfully and email has been sent to ${email}`
                })
              } else {
                res.json({ success: false, error: result })
              }
            }
          )
        }
      })


    }
    else if (!isError && result?.length) {
      res.json({ success: false, message: 'that provided email already belongs to an identity!' })
    }
    else {
      res.json({ success: false, error: result })
    }
  })

  return res
}

module.exports = {
  loginAdmin,
  getSponsorProfileRequestsPending,
  acceptSponsorProfileRequest,
  rejectSponsorProfileRequest,
  createDoctorProfile,
  createCallingAgentProfile,
  getAllSponsor,
  getAllDoctor,
  getAllCallingAgent,
  terminateSponsor,
  terminateDoctor,
  terminateCallingAgent,
  getAllBeneficiaries,
  activateCallingAgent,
  activateDoctor,
  activateSponsor
}

// Calling Agent
// ------------- 
// CNIC: number
// Qualification: string
// Salary: number
// email: string
// gender: strigng
// name: string
// password: string
// phone: string
// shift-timing:time

// Doctor
// ---------
// Address: string
// Specialty: string
// clinicName: string
// email: string
// gender: string
// name: string
// password: string
// phone: number 
// availability: array of object 
