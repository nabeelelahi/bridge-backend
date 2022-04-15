const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");
const jwt = require("../helpers/jwt");

const loginAdmin = (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  sql.customQuery(
    `SELECT * FROM admin WHERE email = '${email}' AND password = '${password}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        // const token = jwt.getToken({}, email+password, '1d' )
        delete result[0].password;
        res.json({
          success: true,
          message: "admin logged in",
          data: result[0],
        });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No such admin" });
      } else {
        res.json({ error: result });
      }
    }
  );

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

  return res;
};

const getSponsorProfileRequestsPending = (req, res) => {
  sql.customQuery(
    `SELECT id, name, email, phone, CNIC, assigned_doctorId, status FROM sponsor WHERE status = 'PENDING'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, requests: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No requests found" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const getAllGuests = (req, res) => {
  sql.customQuery(
    `SELECT id, name, email, status, created_at FROM guest`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, guests: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No sponser registered yet" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const getAllSponsor = (req, res) => {
  sql.customQuery(
    `SELECT id, name, email, phone, cnic, status, created_at FROM sponsor WHERE status != 'PENDING'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, sponsors: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No sponser registered yet" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const getAllBeneficiaries = (req, res) => {
  sql.customQuery(
    `SELECT id, name, email, phone, cnic, age, gender, sponsor_id, status FROM beneficiary`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, beneficiaries: result });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "No beneficiaries registered yet",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const getAllDoctor = (req, res) => {
  sql.customQuery(
    `SELECT id, name, email, phone, gender, address, speciality, cnic, pmdc_number, working_hours, created_at, status FROM doctor`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, doctors: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No sponser registered yet" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const getAllCallingAgent = (req, res) => {
  sql.customQuery(
    `SELECT id, name, email, phone, gender, cnic, salary, qualification, shift_timing, created_at, status FROM calling_agent`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, callingAgents: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No sponser registered yet" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const updateUserStatus = (req, res) => {

  const { id, userType, status } = req.params;

  if (userType === 'sponsor') {
    sql.customQuery(
      `UPDATE ${userType}
       SET status = '${status}'
       WHERE id = '${id}'`,
      (result, isError) => {
        if (!isError) {
          console.log("sponser updated");
          sql.customQuery(
            `UPDATE beneficiary
             SET status = '${status}'
             WHERE sponsor_id = '${id}'`,
            (benResult, benError) => {
              if (!benError) {
                console.log("beneficiary updated");
                res.json({
                  success: true,
                  message: "Sponsor and it's beneficiaries has been updated",
                });
              } else {
                res.json({ success: false, error: result });
              }
            }
          );
        } else {
          res.json({ success: false, error: result });
        }
      }
    );
  }
  else {
    sql.customQuery(
      `UPDATE ${userType}
       SET status = '${status}'
       WHERE id = '${id}'`,
      (result, isError) => {
        if (!isError) {
          res.json({
            success: true,
            message: `${userType} has been updated`,
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );
  }

  return res;
};

const acceptSponsorProfileRequest = (req, res) => {
  const { email, id, assigned_doctorId } = req.body;
  sql.customQuery(
    `SELECT id, name, email, phone, cnic, status FROM sponsor WHERE id = '${id}' AND status = 'PENDING'`,
    (result, isError) => {
      const password = pw(16);
      if (!isError && result?.length) {
        mail("profile-creation-sponsor", { email, password })
        .then((isEmailSent) => {
        console.log(isEmailSent, "Email Sent Response");
        console.log(result, "Email Sent Response");
        if (isEmailSent === 'success') {
        sql.customQuery(
          `UPDATE sponsor SET status = 'APPROVED', password = '${password}', assigned_doctorId = '${assigned_doctorId}' WHERE id = '${result[0].id}'`,
          (result, isError) => {
            if (!isError) {
              res.json({ success: true, data: result[0] });
            } else {
              res.json({ success: false, error: result });
            }
          }
        );
        } else {
          res.json({ success: false, error: "email sent failed" });
        }
        })
        .catch((err) => console.log(err));
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const rejectSponsorProfileRequest = (req, res) => {
  const { email } = req.body;

  sql.customQuery(
    `UPDATE sponsor_profile_requests
     SET status = 'REJECTED'
     WHERE email = '${email}' AND status = 'PENDING'`,
    (result, isError) => {
      if (!isError) {
        res.json({
          success: true,
          message: "sponsor profile rejected successfully",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

  return res;
};

const createCallingAgentProfile = (req, res) => {
  const {
    name,
    email,
    phone,
    cnic,
    gender,
    qualification,
    salary,
    shiftTiming,
  } = req.body;

  const password = pw(16);

  sql.customQuery(
    `SELECT * FROM calling_agent WHERE email = '${email}'`,
    (result, isError) => {
      if (!isError && !result?.length) {
        sql.customQuery(
          `INSERT INTO calling_agent (caid,name,email,password,phone,cnic,gender,qualification,salary,shiftTiming,status)
         VALUES ('${uid(
            16,
            "BAD-"
          )}', '${name}', '${email}', '${password}', '${phone}', '${cnic}', '${gender}', '${qualification}', '${salary}', '${JSON.stringify(
            shiftTiming
          )}', 'ACCEPTED')`,
          (result, isError) => {
            if (!isError) {
              mail("profile-creation-callingAgent", { email, password }).then(
                (isEmailSent) => {
                  console.log(isEmailSent, "Email Sent Response");
                  res.json({
                    success: true,
                    message: `calling agent profile created successfully and email has been sent to ${email}`,
                  });
                }
              );
            } else {
              res.json({ success: false, error: result });
            }
          }
        );
      } else if (!isError && result?.length) {
        res.json({
          success: false,
          message: "that provided email already belongs to an identity!",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

  return res;
};

const createDoctorProfile = (req, res) => {
  const {
    address,
    speciality,
    clinicName,
    email,
    gender,
    name,
    phone,
    pmdcNumber,
    availability,
  } = req.body;

  const password = pw(16);

  sql.customQuery(
    `SELECT * FROM doctor WHERE email = '${email}'`,
    (result, isError) => {
      if (!isError && !result?.length) {
        // mail("profile-creation-callingAgent", { email, password }).then(
        //   (isEmailSent) => {
        // if (isEmailSent) {
        sql.customQuery(
          `INSERT INTO doctor (id, name, email, password, phone, gender, address, working_hours, speciality, pmdc_number, status)
             VALUES ('${uid(
            16,
            "BD-"
          )}', '${name}', '${email}', '${password}', '${phone}', '${gender}', '${address}', '${JSON.stringify(
            availability
          )}', '${speciality}', '${pmdcNumber}', 'ACCEPTED')`,
          (result, isError) => {
            if (!isError) {
              res.json({
                success: true,
                message: `doctor profile created successfully and email has been sent to ${email}`,
              });
            } else {
              res.json({ success: false, error: result });
            }
          }
        );
        // }
        //   }
        // );
      } else if (!isError && result?.length) {
        res.json({
          success: false,
          message: "that provided email already belongs to an identity!",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

  return res;
};

const getOrders = (req, res) => {

  const { categoryType } = req.params

  let category;

  if (categoryType === "appointment") category = "purchased_appointments"

  if (categoryType === "medicine") category = "purchased_medicines"

  if (categoryType === "labtest") category = "purchased_labtests"

  sql.customQuery(
    `SELECT * FROM ${category}  WHERE status = 'APPROVED'`,
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
  loginAdmin,
  getSponsorProfileRequestsPending,
  acceptSponsorProfileRequest,
  rejectSponsorProfileRequest,
  createDoctorProfile,
  createCallingAgentProfile,
  getAllGuests,
  getAllSponsor,
  getAllDoctor,
  getAllCallingAgent,
  getAllBeneficiaries,
  updateUserStatus,
  getOrders
};

// Calling Agent
// -------------
// cnic: number
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
