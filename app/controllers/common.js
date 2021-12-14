const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");
const pw = require("../helpers/pw");

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

const buyService = (req, res) => {
  // const buyFakeService = [
  //   {
  //     id: 1,
  //     name: "Care giver home visit",
  //     price: 3000,
  //     discount: 15,
  //   },
  // ];
  // res.json({ success: true, data: fakeServices });

  let buyServicesQuery = `SELECT * FROM service`;
  sql.customQuery(buyServicesQuery, (result, isError) => {
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
  });
  return res;
};

const requestAppointment = (req, res) => {
  const buyFakeService = [
    {
      id: 1,
      name: "Care giver home visit",
      price: 3000,
      discount: 15,
    },
  ];
  // sql.customQuery(
  //     ``,
  //     (result, isError) => {
  //         if (!isError && result?.length) {
  //             res.json({ success: true, data: result[0] })
  //         } else if (!isError && !result?.length) {
  //             res.json({ success: false, message: 'no identity corresponds to these credentials' })
  //         } else {
  //             res.json({ success: false, error: result })
  //         }
  //     }
  // )
  res.json({ success: true, data: fakeServices });
  return res;
};

// emr
const emr = (req, res) => {
  const buyFakeService = [
    {
      id: 1,
      name: "Care giver home visit",
      price: 3000,
      discount: 15,
    },
  ];
  // sql.customQuery(
  //     ``,
  //     (result, isError) => {
  //         if (!isError && result?.length) {
  //             res.json({ success: true, data: result[0] })
  //         } else if (!isError && !result?.length) {
  //             res.json({ success: false, message: 'no identity corresponds to these credentials' })
  //         } else {
  //             res.json({ success: false, error: result })
  //         }
  //     }
  // )
  res.json({ success: true, data: fakeServices });
  return res;
};

module.exports = {
  services,
  buyService,
  requestAppointment,
  emr,
};
