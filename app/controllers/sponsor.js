const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");
const moment = require('moment')

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

  const valid_from = moment(new Date()).format('DD-MMM-YYYY')
  const valid_till = moment(new Date()).add(3, 'month').format('DD-MMM-YYYY')

  sql.customQuery(
    `SELECT name, email FROM sponsor WHERE email = '${email}' OR phone = '${phone}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({
          success: false,
          message:
            "the provided credentials match to an already existing identity",
        });
      } else if (!isError && !result?.length) {
        sql.customQuery(
          `INSERT INTO sponsor (
            id, 
            name, 
            email, 
            phone, 
            cnic, 
            age, 
            marital_status, 
            frequent_call_allowed, 
            blood_group, 
            preferred_way_of_contact, 
            primary_address, 
            secondary_address, 
            city, 
            state, 
            postal_code, 
            gender, 
            valid_till,
            valid_from,
            status
            )
           VALUES ('${uid(
            16,
            "-"
          )}', 
          '${name}', 
          '${email}', 
          '${phone}', 
          '${cnic}', 
          '${age}', 
          '${maritalStatus}', 
          '${frequentCallAllowed}', 
          '${bloodGroup}', 
          '${preferredWayOfContact}', 
          '${primaryAddress}', 
          '${secondaryAddress}', 
          '${city}', 
          '${state}', 
          '${postalCode}', 
          '${gender}',
          '${valid_till}',
          '${valid_from}',
           'PENDING'
           )              
           `,
          (result, isError) => {
            if (!isError) {
              result.orderId = `si_${new Date(valid_from).getTime()}`
              res.json({
                success: true,
                message: "request sent successfully",
                result
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
  console.log(req.body)
  sql.customQuery(
    `SELECT id, name, email, phone, CNIC, status, assigned_doctorId, valid_from, valid_till 
         FROM 
         sponsor 
         WHERE email = '${email}'
         OR phone = '${email}'
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
  const { sponserId } = req.params;

  sql.customQuery(
    `SELECT id, name, email, phone, age, gender, cnic, marital_status, preferred_way_of_contact, sponsor_id FROM beneficiary WHERE sponsor_id = '${sponserId}'`,
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
    created_at,
    assigned_doctorId,
    sponsor_id
  } = req.body;

  const beneficiaryId = uid(16, "-");

  // console.log(req.body, "body");

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
          `INSERT INTO beneficiary (id, name, email, phone, cnic, sponsor_id, age, marital_status, frequent_call_allowed, blood_group, preferred_way_of_contact, relation_with_sponsor, primary_address, secondary_address, city, state, postal_code, gender, status, created_at, assigned_doctorId)
           VALUES ('${beneficiaryId}', '${name}', '${email}', '${phone}', ${cnic}, '${sponsor_id}', '${age}', '${maritalStatus}', '${frequentCallAllowed}', '${bloodGroup}', '${preferredWayOfContact}', '${relationWithSponsor}', '${primaryAddress}', '${secondaryAddress}', '${city}', '${state}', ${postalCode}, '${gender}', 'PENDING', '${created_at}', '${assigned_doctorId}')              
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

const renewSponsorShip = (req, res) => {

  const { id } = req.params;

  const valid_from = moment(new Date()).format('DD-MMM-YYYY')
  const valid_till = moment(new Date()).add(1, 'month').format('DD-MMM-YYYY')

  sql.customQuery(
    `UPDATE sponsor
       SET 
       status = 'PENDING',
       valid_from = '${valid_from}',
       valid_till = '${valid_till}'
       WHERE id = '${id}'`,
    (result, isError) => {
      if (!isError) {
        console.log("sponser updated");
        sql.customQuery(
          `UPDATE beneficiary
             SET status = 'PENDING',
             valid_from = '${valid_from}',
             valid_till = '${valid_till}'
             WHERE sponsor_id = '${id}'`,
          (benResult, benError) => {
            if (!benError) {
              res.json({
                success: true,
                message: "You're request has been sent. Please proceed to payment.",
                orderId: `si_${new Date(valid_from).getTime()}`
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

module.exports = {
  login,
  requestForProfile,
  beneficiaries,
  newBeneficiary,
  renewSponsorShip
};
