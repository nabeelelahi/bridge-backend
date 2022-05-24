const moment = require('moment')
const { sql } = require("../config/db");

function validateDate(valid_from, valid_till, date) {

    const itemRes = moment(new Date(date))
        .isBetween(new Date(valid_from), new Date(valid_till))

    return itemRes;

}

function validateSponsorShip(req, res, serviceTable, insert) {

    const {
        buyerId,
        serviceId,
        valid_from,
        valid_till,
        date
    } = req.body;

    const isValid = validateDate(valid_from, valid_till, date)

    function sortArray(result) {
        let tempArray = [];
        result?.map(item => validateDate(valid_from, valid_till, item.date) && tempArray.push(item))
        return tempArray
    }

    if (isValid) {

        
        const query = `SELECT * FROM  ${serviceTable} WHERE service_id = '${serviceId}' AND buyer_id = '${buyerId}'`
        console.log(query)
        
        sql.customQuery(
            query,
            (result, isError) => {
                if (!isError && result?.length) {
                    sql.customQuery(
                        `SELECT id, part_of_sponsorship, availabilty_on_sponsorship FROM service WHERE id = '${serviceId}'`,
                        (service, err) => {
                            if (!isError && service?.length) {
                                const { part_of_sponsorship, availabilty_on_sponsorship, sortedResult } = service[0];
                                if (part_of_sponsorship) {
                                    console.log(availabilty_on_sponsorship, sortArray(result).length)
                                    if (availabilty_on_sponsorship > 0 && availabilty_on_sponsorship > sortArray(result).length) {
                                        console.log('free')
                                        insert(true)
                                    }
                                    else {
                                        console.log('paid')
                                        insert(false)
                                    }
                                }
                                else{
                                    console.log('paid')
                                    insert(false)
                                }
                            }
                            else {
                                res.json({
                                    success: false,
                                    message: 'Something went wrong'
                                })
                            }

                        });
                }
                else if (!isError && !result?.length) {
                    sql.customQuery(
                        `SELECT id, part_of_sponsorship, availabilty_on_sponsorship FROM service WHERE id = '${serviceId}'`,
                        (service, err) => {
                            if (!isError && service?.length) {
                                const { part_of_sponsorship, availabilty_on_sponsorship, sortedResult } = service[0];
                                if (part_of_sponsorship) {
                                    console.log(availabilty_on_sponsorship, sortArray(result).length)
                                    console.log('free------no length')
                                    insert(true)
                                }
                                else {
                                    console.log('paid------no length')
                                    insert(false)
                                }
                            }
                            else {
                                res.json({
                                    success: false,
                                    message: 'Something went wrong'
                                })
                            }

                        });
                }
                else {
                    res.json({
                        success: false,
                        message: 'Something went wrong'
                    })
                }
            })

    }
    else {
        insert(false)
    }


    return res;
}

module.exports = {
    validateSponsorShip,
    validateDate
};