const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  sql.customQuery(
    `SELECT 
         did, name, email, 
         phone, gender, address, 
         clinicName, speciality, 
         pmdcNumber, availability, 
         createdAt, status 
         FROM 
         doctor 
         WHERE email = '${email}' 
         AND 
         password = '${password}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result[0] });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "no identity corresponds to these credentials",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const patients = (req, res) => {
  const { doctorId } = req.params;
  console.log(req.params);
  // check for which fields are needed......
  sql.customQuery(`SELECT * FROM my_patient  
  RIGHT JOIN guest ON my_patient.patient_id = guest.id
  WHERE doctor_id = '${doctorId}' AND patient_type = 'GUEST'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result[0] });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "no identity corresponds to these credentials",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const appointments = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  sql.customQuery(
    `SELECT 
         did, name, email, 
         phone, gender, address, 
         clinicName, speciality, 
         pmdcNumber, availability, 
         createdAt, status 
         FROM 
         doctor 
         WHERE email = '${email}' 
         AND 
         password = '${password}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result[0] });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "no identity corresponds to these credentials",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const upcomingAppointments = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  sql.customQuery(
    `SELECT 
         did, name, email, 
         phone, gender, address, 
         clinicName, speciality, 
         pmdcNumber, availability, 
         createdAt, status 
         FROM 
         doctor 
         WHERE email = '${email}' 
         AND 
         password = '${password}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result[0] });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "no identity corresponds to these credentials",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const appointmentDetails = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  sql.customQuery(
    `SELECT 
         did, name, email, 
         phone, gender, address, 
         clinicName, speciality, 
         pmdcNumber, availability, 
         createdAt, status 
         FROM 
         doctor 
         WHERE email = '${email}' 
         AND 
         password = '${password}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result[0] });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "no identity corresponds to these credentials",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const getPatients = async (req, res) => {

  const { id, userType } = req.params;

  sql.customQuery(
    `SELECT * FROM ${userType} WHERE assigned_doctorId = '${id}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, beneficiaries: result });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "You have not been assigned yet",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

  return res;
};

const updateHER = (req, res) => {

  const {
    previourHER,
    patientId,
    sugar,
    bloodPressure,
    ear,
    eye,
    hRate,
    height,
    skin,
    tempreture,
    weight,
  } = req.body

  if(previourHER){
    
    const query = `INSERT INTO her 
  (
    patientId,
    sugar,
    bloodPressure,
    ear,
    eye,
    hRate,
    height,
    skin,
    tempreture,
    weight
    )
     VALUES ( 
       '${patientId}', 
       '${sugar}', 
       '${bloodPressure}', 
       '${ear}',  
       '${eye}',  
       '${hRate}',  
       '${height}',  
       '${skin}',  
       '${tempreture}',  
       '${weight}'
       )              
     `

     sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          res.json({
            success: true,
            message: "HER has been updated successfully",
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );

  }
  else{

    const query = `UPDATE her SET 
    sugar = ${sugar},
    bloodPressure = ${bloodPressure},
    ear = ${ear},
    eye = ${eye},
    hRate = ${hRate},
    height = ${height},
    skin = ${skin},
    tempreture ${tempreture},
    weight ${weight}, 
    WHERE patientId = '${patientId}'`

    sql.customQuery(
      query,
      (result, isError) => {
          if (!isError) {
              res.json({ success: true, message: 'HER has been updated successfully' })
          }
          else {
              res.json({ success: false, error: isError })
          }
      }
  )

  }

  return res;

}

module.exports = {
  login,
  patients,
  appointments,
  upcomingAppointments,
  appointmentDetails,
  getPatients,
  updateHER
};
