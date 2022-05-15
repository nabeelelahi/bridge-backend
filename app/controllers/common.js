const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");
const moment = require("moment");

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

  const status = 'PENDING';

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
       '${amount}',  
       '${discount}',  
       '${price}',  
       '${discription}',  
       '${date}',  
       '${time}',  
       '${createdAt}',  
       '${status}', 
       '${buyerType}'  
       )              


       `

  function insert() {

    console.log('insert')

    sql.customQuery(
      query,
      (result, isError) => {
        if (!isError) {
          res.json({
            success: true,
            message: "Your appointment has been requested",
          });
        } else {
          res.json({ success: false, error: result });
        }
      }
    );

    return;

  }

  sql.customQuery(
    `SELECT date, time, id from purchased_appointments WHERE date = '${date}' AND service_id = '${serviceId}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        let resLength = 0;
        result.forEach((item) => {
          const afterCheckTime = moment(new Date(`${date} ${time}`)).add('15', 'minutes')
          const beforeCheckTime = moment(new Date(`${date} ${time}`)).subtract('15', 'minutes')
          const itemTime = new Date(`${item.date} ${item.time}`)
          const itemRes = moment(itemTime).isBetween(beforeCheckTime, afterCheckTime)
          if (itemRes) resLength++
        })
        if (resLength) {
          res.json({
            success: false,
            message: "This time slot is occupied please select an other time",
          });
        }
        else insert()
      }
      else if (!isError && !result?.length) {
        insert()
      }
      else {
        res.json({ success: false, error: result });
      }
    });
  return res;

};

const requestMedicine = (req, res) => {

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

  const status = 'PENDING';

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
       '${amount}', 
       '${discount}',  
       '${price}',  
       '${date}',
    '${time}',
       '${discription}',
       '${createdAt}',  
       '${status}', 
       '${buyerType}'  
       )              
     `

  sql.customQuery(
    query,
    (result, isError) => {
      if (!isError) {
        res.json({
          success: true,
          message: "Your order has been requested",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

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

  const status = 'PENDING';

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
       '${amount}',  
       '${discount}',  
       '${price}',  
       '${discription}',  
       '${date}',  
       '${time}',  
       '${createdAt}',  
       '${status}', 
       '${buyerType}'  
       )              
     `
  sql.customQuery(
    query,
    (result, isError) => {
      if (!isError) {
        res.json({
          success: true,
          message: "Your labtest has been requested",
        });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );

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
    `SELECT status FROM ${table} WHERE id='${id}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, data: result[0] })
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
