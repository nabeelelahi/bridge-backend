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

module.exports = {
  login,
  patients,
  appointments,
  upcomingAppointments,
  appointmentDetails
};
