const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");

// view service

const services = (req, res) => {
  let getAllServicesQuery = `SELECT * FROM service`;
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
  let getAllServicesQuery = `SELECT * FROM service WHERE type = '${req.params.type}'`;
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

  if (categoryType === "medicine" || categoryType ===  "medication") category = "purchased_medicines"

  if (categoryType === "labtest") category = "purchased_labtests"

  const query = `
  SELECT 		
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

module.exports = {
  services,
  servicesByCategory,
  servicesByType,
  requestAppointment,
  requestMedicine,
  requestLabTest,
  getPreviousOrders,
  getHER
};
