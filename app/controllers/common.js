const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");
const moment = require("moment");
const { validateDate, validateSponsorShip } = require('../helpers/validate')

// view service

const services = (req, res) => {
  let getAllServicesQuery = `SELECT 	
  id,	
  title,	
  description,	
  discount,	
  price,		
  category_type	
   FROM service`;
  sql.customQuery(getAllServicesQuery, (result, isError) => {
    if (!isError && result?.length) {
      res.json({ success: true, data: result });
    } else if (!isError && !result?.length) {
      res.json({ success: false, message: "no services" });
    } else {
      res.json({ success: false, error: result });
    }
  });
  return res;
};

const servicesByType = (req, res) => {
  let getAllServicesQuery = `SELECT 
  id,	
  title,	
  description,	
  discount,	
  price,		
  category_type	
  FROM service WHERE type = '${req.params.type}'`;
  sql.customQuery(getAllServicesQuery, (result, isError) => {
    if (!isError && result?.length) {
      res.json({ success: true, data: result });
    } else if (!isError && !result?.length) {
      res.json({ success: false, message: "no services" });
    } else {
      res.json({ success: false, error: result });
    }
  });
  return res;
};

const servicesByCategory = (req, res) => {
  let getAllServicesQuery = `
  SELECT
  id, 
  title,
  description,
  discount,
  price,
  category_type
  FROM service WHERE category_type = '${req.params.category}'
  `;
  sql.customQuery(getAllServicesQuery, (result, isError) => {
    if (!isError && result?.length) {
      res.json({ success: true, data: result });
    } else if (!isError && !result?.length) {
      res.json({ success: false, message: "no services" });
    } else {
      res.json({ success: false, error: result });
    }
  });
  return res;
};

// request services

const requestAppointment = (req, res) => {

  const {
    buyerId,
    buyerType,
    serviceId,
    doctorId,
    serviceName,
    amount,
    discount,
    price,
    discription,
    date,
    time,
    createdAt,
  } = req.body;

  function insert(isFree) {

    const paymentAmount = isFree ? 0 : amount

    const query = `INSERT INTO purchased_appointments 
    (
      buyer_id,	
      service_id,	
      doctor_id,	
      service_name,	
      amount,	
      discount,	
      price,	
      discription,	
      date,	
      time,	
      created_at,	
      status,	
      buyer_type
      )
       VALUES (
         '${buyerId}', 
         '${serviceId}', 
         '${doctorId}', 
         '${serviceName}', 
         '${paymentAmount}',  
         '${discount}',  
         '${price}',  
         '${discription}',  
         '${date}',  
         '${time}',  
         '${createdAt}',  
         'PENDING', 
         '${buyerType}'  
         )`

    sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          result.amount = paymentAmount;
          res.json({
            success: true,
            message: "Your appointment has been requested",
            result
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );

    return;

  }

  function matchTimings(result) {

    let length = 0;

    result.forEach((item) => {
      const afterCheckTime = moment(new Date(`${date} ${time}`)).add('15', 'minutes')
      const beforeCheckTime = moment(new Date(`${date} ${time}`)).subtract('15', 'minutes')
      const itemTime = new Date(`${item.date} ${item.time}`)
      const itemRes = moment(itemTime).isBetween(beforeCheckTime, afterCheckTime)
      if (itemRes) return length++
    })

    return length

  }

  sql.customQuery(
    `SELECT date, time, id from purchased_appointments WHERE date = '${date}' AND service_id = '${serviceId}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        let resLength = matchTimings(result);
        if (resLength) {
          res.json({
            success: false,
            message: "This time slot is occupied please select an other time",
          });
        }
        else {
          if (buyerType === 'sponsor' || buyerType === 'beneficiary') {
            console.log('validateSponsorShip')
            validateSponsorShip(req, res, 'purchased_appointments', insert)
          }
          else {
            console.log('insert(false)')
            insert(false)
          }
        }
      }
      else if (!isError && !result?.length) {
        if (buyerType === 'sponsor' || buyerType === 'beneficiary') {
          validateSponsorShip(req, res, 'purchased_appointments', insert)
        }
        else {
          console.log('false')
          insert(false)
        }
      }
      else {
        res.json({ success: false, error: result });
      }
    });
  return res;

};

const requestMedicine = async (req, res) => {

  const {
    buyerId,
    buyerType,
    serviceId,
    serviceName,
    amount,
    date,
    time,
    discount,
    price,
    discription,
    createdAt,
  } = req.body;

  function insert(isFree) {

    const paymentAmount = isFree ? 0 : amount

    const query = `INSERT INTO purchased_medicines 
  (
    buyer_id,	
    service_id,	
    service_name,
    amount,	
    discount,	
    price,
    date,
    time,	
    discription,	
    created_at,	
    status,	
    buyer_type
    )
     VALUES 
     (
       '${buyerId}', 
       '${serviceId}', 
       '${serviceName}', 
       '${paymentAmount}', 
       '${discount}',  
       '${price}',  
       '${date}',
    '${time}',
       '${discription}',
       '${createdAt}',  
       'PENDING', 
       '${buyerType}'  
       )`

    sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          result.amount = paymentAmount;
          res.json({
            success: true,
            message: "Your order has been requested",
            result
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );


    return

  }

  if (buyerType === 'sponsor' || buyerType === 'beneficiary') {
    validateSponsorShip(req, res, 'purchased_medicines', insert)
  }
  else {
    insert(false)
  }

  return res

};

const requestLabTest = (req, res) => {

  const {
    buyerId,
    buyerType,
    serviceId,
    serviceName,
    amount,
    discount,
    price,
    discription,
    date,
    time,
    createdAt,
  } = req.body;

  function insert(isFree) {

    const paymentAmount = isFree ? 0 : amount

    const query = `INSERT INTO purchased_labtests
    (
      buyer_id,	
      service_id,		
      service_name,	
      amount,	
      discount,	
      price,	
      discription,	
      date,	
      time,	
      created_at,	
      status,	
      buyer_type
      )
       VALUES (
         '${buyerId}', 
         '${serviceId}', 
         '${serviceName}', 
         '${paymentAmount}',  
         '${discount}',  
         '${price}',  
         '${discription}',  
         '${date}',  
         '${time}',  
         '${createdAt}',  
         'PENDING', 
         '${buyerType}'  
         )`

    sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          result.amount = paymentAmount;
          res.json({
            success: true,
            message: "Your labtest has been requested",
            result
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );

  }

  if (buyerType === 'sponsor' || buyerType === 'beneficiary') {
    validateSponsorShip(req, res, 'purchased_labtests', insert)
  }
  else {
    insert()
  }

  return res

};

// emr

const getPreviousOrders = (req, res) => {

  const { id, categoryType, buyerType } = req.params;

  let category;

  if (categoryType === "appointment") category = "purchased_appointments"

  if (categoryType === "medicine" || categoryType === "medication") category = "purchased_medicines"

  if (categoryType === "labtest") category = "purchased_labtests"

  const query = `
  SELECT 		
  id,
    service_name,	
    amount,	
    discount,	
    price,	
    discription,	
    date,
    time,	
    created_at,	
    status
  FROM ${category} WHERE buyer_id = '${id}' AND buyer_type = '${buyerType}'
  `;


  sql.customQuery(
    query,
    (result, isError) => {

      if (!isError && result?.length) {
        res.json({ success: true, data: result });
      }
      else if (!isError && !result?.length) {
        res.json({ success: true, data: [], message: "You have not purcased any labtest yet.." });
      }
      else {
        res.json({ success: false, error: result });
      }
    });
  return res;
};

const getHER = (req, res) => {

  const { id } = req.params;

  sql.customQuery(
    `SELECT * FROM her WHERE patientId = '${id}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No sponser registered yet" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;

  return res;
};

const getCombordites = (req, res) => {

  const { id } = req.params;

  sql.customQuery(
    `SELECT * FROM comobordites WHERE patient_id = '${id}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No sponser registered yet" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;

  return res;
};

// prescription

const getPrescription = (req, res) => {

  const { appointment_id } = req.params

  sql.customQuery(
    `SELECT appointment_id, title, description FROM prescription WHERE appointment_id = ${appointment_id}`,
    (result, isError) => {

      if (!isError && result?.length) {
        res.json({ success: true, data: result });
      }
      else if (!isError && !result?.length) {
        res.json({ success: false, message: "No prescription found" });
      }
      else {
        res.json({ success: false, error: result });
      }

    });

  return res;
};

// sponsor

const getSponsorById = (req, res) => {

  const { sponsor_id } = req.params

  sql.customQuery(
    `SELECT id, name, email, phone, CNIC, status FROM sponsor WHERE id='${sponsor_id}'`,
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

const getUserStatus = (req, res) => {

  const { userType, id } = req.params

  let table;

  if (userType === 'doctor') table = 'doctor'
  else if (userType === 'beneficiary') table = 'beneficiary'
  else if (userType === 'sponsor') table = 'sponsor'

  sql.customQuery(
    `SELECT status, valid_till, valid_from FROM ${table} WHERE id='${id}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        const { valid_till, valid_from } = result[0];
        const isValid = validateDate(valid_from, valid_till, new Date())
        if(isValid) res.json({ success: true, data: result[0] })
        else res.json({ succes: true, data: { valid_from, valid_till, status: 'EXPIRED' } })
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "no requests found" })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res

}

const changePassword = (req, res) => {

  const { userType, id, oldPassword, newPassword } = req.body

  let table;

  if (userType === 'doctor') table = 'doctor'
  else if (userType === 'beneficiary') table = 'beneficiary'
  else if (userType === 'sponsor') table = 'sponsor'

  const updateQuery = `UPDATE ${table}
  SET password = '${newPassword}'
  WHERE id='${id}'`

  const getQuery = `SELECT password FROM ${table} WHERE id='${id}' AND password='${oldPassword}'`

  function update() {
    sql.customQuery(updateQuery, (result, isError) => {
      if (!isError) {
        res.json({
          success: true,
          message: "Password has been updated",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
    )
  }

  sql.customQuery(
    getQuery,
    (result, isError) => {
      if (!isError && result?.length) {
        update()
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "Please enter correct password" })
      } else {
        res.json({ success: false, error: result })
      }
    }
  )
  return res

}

module.exports = {
  services,
  servicesByCategory,
  servicesByType,
  requestAppointment,
  requestMedicine,
  requestLabTest,
  getPreviousOrders,
  getHER,
  getCombordites,
  getPrescription,
  getSponsorById,
  getUserStatus,
  changePassword
};
