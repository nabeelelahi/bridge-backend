const { mail } = require("../services/mail");
const { sql } = require("../config/db");
const uid = require("../helpers/uid");

const login = (req, res) => {
  const { name, email, photo } = req.body;
  console.log(req.body);
  const guestId = uid(16,"-");
  sql.customQuery(
    `SELECT
         email,
         id, 
         photo  
         FROM
         guest 
         WHERE email = '${email}'`,
    (result, isError) => {
      if (!isError && result?.length) {
        res.json({
          success: true,
          message: "guest logged in successfully",
          data: result[0],
        });
      } else if (!isError && !result?.length) {
        sql.customQuery(
          `INSERT INTO guest (id, name, email, photo) VALUES ('${guestId}', '${name}', '${email}', '${photo}')`,
          (result, isError) => {
            if (!isError) {
              res.json({
                success: true,
                message: "guest logged in successfully",
                data: [{ id: guestId, name, email, photo }],
              });
            } else {
              res.json({ success: false, message: result });
            }
          }
        );
      } else {
        res.json({ success: false, error: result });
      }
    }
  );
  return res;
};

module.exports = {
  login,
};
