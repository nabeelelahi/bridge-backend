const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");

const requestForProfile = (req, res) => {
  const {
    name,
    email,
    phone,
    cnic,
    age,
    maritalStatus,
    frequentCallAllowed,
    bloodGroup,
    preferredWayOfContact,
    primaryAddress,
    secondaryAddress,
    city,
    state,
    postalCode,
    gender,
  } = req.body;
  console.log(req.body);
  sql.customQuery(
    `SELECT name, email, phone, cnic, age, marital_status, frequent_call_allowed, blood_group, preferred_way_of_contact, primary_address, secondary_address, city, state, postal_code, gender, status FROM sponsor WHERE name = '${name}' OR email = '${email}' OR phone = '${phone}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({
          success: false,
          message:
            "the provided credentials match to an already existing identity",
        });
      } else if (!isError && !result?.length) {
        sql.customQuery(
          `INSERT INTO sponsor (id, name, email, phone, cnic, age, marital_status, frequent_call_allowed, blood_group, preferred_way_of_contact, primary_address, secondary_address, city, state, postal_code, gender, status)
           VALUES ('${uid(
             16,
             "-"
           )}', '${name}', '${email}', '${phone}', '${cnic}', '${age}', '${maritalStatus}', '${frequentCallAllowed}', '${bloodGroup}', '${preferredWayOfContact}', '${primaryAddress}', '${secondaryAddress}', '${city}', '${state}', '${postalCode}', '${gender}', 'PENDING_ADMIN_APPROVAL')              
           `,
          (result, isError) => {
            if (!isError) {
              res.json({
                success: true,
                message: "request sent successfully",
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
  // res.json({
  //   success: true,
  //   message: "request sent succesfully",
  //   data: [req.body],
  // });
  return res;
};

const login = (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  sql.customQuery(
    `SELECT id, name, email, phone, CNIC, status 
         FROM 
         sponsor 
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

const beneficiaries = (req, res) => {
  const { sid } = req.params;

  sql.customQuery(
    `SELECT id, name, email, phone, cnic, sponsor_id FROM beneficiary WHERE sponsor_id = '${sid}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({ success: true, beneficiaries: result });
      } else if (!isError && !result?.length) {
        res.json({ success: false, message: "No beneficiaries registered" });
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

const newBeneficiary = (req, res) => {
  const {
    name,
    email,
    phone,
    cnic,
    age,
    maritalStatus,
    frequentCallAllowed,
    bloodGroup,
    preferredWayOfContact,
    primaryAddress,
    secondaryAddress,
    relationWithSponsor,
    city,
    state,
    postalCode,
    gender,
  } = req.body;

  const beneficiaryId = uid(16, "-");

  console.log(req.body, "body");

  sql.customQuery(
    `SELECT name, email, phone, cnic, age, marital_status, frequent_call_allowed, blood_group, preferred_way_of_contact, relation_with_sponsor, primary_address, secondary_address, city, state, postal_code, gender, status FROM beneficiary WHERE name = '${name}' OR email = '${email}' OR phone = '${phone}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({
          success: false,
          message:
            "the provided credentials match to an already existing identity",
        });
      } else if (!isError && !result?.length) {
        sql.customQuery(
          `INSERT INTO beneficiary (id, name, email, phone, cnic, age, marital_status, frequent_call_allowed, blood_group, preferred_way_of_contact, relation_with_sponsor, primary_address, secondary_address, city, state, postal_code, gender, status)
           VALUES ('${beneficiaryId}', '${name}', '${email}', '${phone}', ${cnic}, '${age}', '${maritalStatus}', '${frequentCallAllowed}', '${bloodGroup}', '${preferredWayOfContact}', '${relationWithSponsor}', '${primaryAddress}', '${secondaryAddress}', '${city}', '${state}', ${postalCode}, '${gender}', 'PENDING_ADMIN_APPROVAL')              
           `,
          (result, isError) => {
            if (!isError) {
              res.json({
                success: true,
                message: "request sent successfully",
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
  // res.json({
  //   success: true,
  //   message: "request sent succesfully",
  //   data: [req.body],
  // });
  return res;
};

module.exports = {
  login,
  requestForProfile,
  beneficiaries,
  newBeneficiary,
};
