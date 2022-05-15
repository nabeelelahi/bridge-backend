const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  sql.customQuery(
    `SELECT * FROM doctor WHERE email = '${email}' OR phone = '${email}' AND  password = '${password}'`,
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

  const { id, status } = req.params;

  sql.customQuery(
    `SELECT  * FROM purchased_appointments WHERE doctor_id = '${id}' AND status = '${status}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result });
      } else if (!isError && !result?.length) {
        res.json({
          success: false,
          message: "You have not been assigned to any appointment",
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
    `SELECT id, name, email, phone, age, gender, cnic, marital_status, preferred_way_of_contact FROM ${userType} WHERE assigned_doctorId = '${id}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result });
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
    previousHER,
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

  if (!previousHER) {

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
       "${height}",  
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
  else {

    const query = `UPDATE her SET 
    sugar = '${sugar}',
    bloodPressure = '${bloodPressure}',
    ear = '${ear}',
    eye = '${eye}',
    hRate = '${hRate}',
    height = '${height}',
    skin = '${skin}',
    tempreture = '${tempreture}',
    weight = '${weight}'
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

const updateComobordites = (req, res) => {

  const {
    previousHER,
    patient_id,
    hepatitis_b,
    hepatitis_c,
    TB,
    organ_transplant,
    on_dialysis,
    tuber_clouses,
    diabetes_mellitus,
    other_mallgancies,
    created_at
  } = req.body

  if (!previousHER) {

    const query = `INSERT INTO comobordites 
  (
    patient_id,
    hepatitis_b,
    hepatitis_c,
    TB,
    organ_transplant,
    on_dialysis,
    tuber_clouses,
    diabetes_mellitus,
    other_mallgancies,
    created_at
    )
     VALUES ( 
      '${patient_id}',
      '${hepatitis_b}',
      '${hepatitis_c}',
      '${TB}',
      '${organ_transplant}',
      '${on_dialysis}',
      '${tuber_clouses}',
      '${diabetes_mellitus}',
      '${other_mallgancies}',
      '${created_at}'
       )              
     `

    sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          res.json({
            success: true,
            message: "Comobordites has been updated successfully",
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );

  }
  else {

    const query = `UPDATE comobordites SET 
    hepatitis_b = '${hepatitis_b}',
    hepatitis_c = '${hepatitis_c}',
    TB = '${TB}',
    organ_transplant = '${organ_transplant}',
    on_dialysis = '${on_dialysis}',
    tuber_clouses = '${tuber_clouses}',
    diabetes_mellitus = '${diabetes_mellitus}',
    other_mallgancies = '${other_mallgancies}'
    WHERE patient_id = '${patient_id}'`

    sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          res.json({ success: true, message: 'Comobordites has been updated successfully' })
        }
        else {
          res.json({ success: false, error: result })
        }
      }
    )

  }

  return res;

}

const writePrescription = (req, res) => {

  const {
    title,
    description,
    appointment_id,
    buyer_id,
    created_at,
    created_by,
    doctor_id
  } = req.body

  const query = `INSERT INTO 
  prescription (
    title,	
    description,	
    appointment_id,	
    buyer_id,	
    doctor_id,	
    created_by,	
    created_at
    )
  VALUES (
    '${title}',	
    '${description}',	
    '${appointment_id}',	
    '${buyer_id}',	
    '${doctor_id}',	
    '${created_by}',	
    '${created_at}'
    );`

  sql.customQuery(
    query,
    (result, isError) => {
      if (!isError) {
        sql.customQuery(
          `UPDATE purchased_appointments SET status = 'COMPLETED' WHERE id = '${appointment_id}'`,
          (result, isError) => {
            if (!isError) {
              res.json({ success: true, message: 'Prescription has been Updated Appointment is completed' })
            }
            else {
              res.json({ success: false, error: isError })
            }
          }
        )
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

}

module.exports = {
  login,
  patients,
  appointments,
  upcomingAppointments,
  appointmentDetails,
  getPatients,
  updateHER,
  updateComobordites,
  writePrescription
};
