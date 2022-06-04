const mysql = require('mysql')
const creds = require('./creds')

// const pool = mysql.createPool(creds().PROD_dbCreds)

// pool.on('connection', (res) => {
//   console.log(pool)
// })

//  console.log(pool)

const pool = mysql.createPool(creds().PROD_dbCreds).once('connection', () => {
  console.log('DATABASE CONNECTION ESTABLISHED')
})

const sql = {
  checkQuery: (tableName, values, cb) => {
    // console.log(values)
    let chkQ = `SELECT * FROM ${tableName} WHERE (${Object.entries(values).map(
      val => {
        return typeof val[1] === 'string'
          ? val[0] + '=' + "'" + val[1] + "'"
          : val[0] + '=' + val[1]
      }
    )})`
    chkQ = chkQ.replace(/[,]/gim, ' OR ')
    pool.query(chkQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  checkWithAndQuery: (tableName, values, cb) => {
    // console.log(values)
    let chkQ = `SELECT * FROM ${tableName} WHERE (${Object.entries(values).map(
      val => {
        return typeof val[1] === 'string'
          ? val[0] + '=' + "'" + val[1] + "'"
          : val[0] + '=' + val[1]
      }
    )})`
    chkQ = chkQ.replace(/[,]/gim, ' AND ')
    pool.query(chkQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  insertQuery: (tableName, values, cb) => {
    // console.log(values)
    const iQ = `INSERT into ${tableName} (${Object.keys(
      values
    )}) VALUES (${Object.values(values).map(val => {
      let valueReplaced =
        typeof val == 'string' && val.includes("'")
          ? val.replace("'", '`')
          : val
      return "'" + valueReplaced + "'"
    })}) `
    pool.query(iQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  updateQuery: (tableName, values, cb, idName = null, idVal = null) => {
    // console.log(idName, idVal, 'id name in update query')
    const uQ = `
    UPDATE ${tableName} SET ${Object.keys(values).map((key, i) => {
      let valueReplaced =
        typeof Object.values(values)[i] == 'string' &&
          Object.values(values)[i].includes("'")
          ? Object.values(values)[i].replace("'", '`')
          : Object.values(values)[i]
      return key + '=' + "'" + valueReplaced + "'"
    })}  
    WHERE(${idName}='${idVal}') `
    pool.query(uQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  deleteQuery: (tableName, idColName, idColValue, cb) => {
    const dQ = `DELETE FROM ${tableName} WHERE ${idColName} = '${idColValue}'`
    pool.query(dQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  selectQuery: (
    tableName,
    values,
    cb,
    specificCols = null,
    allRecords = false
  ) => {
    const sQ = `SELECT ${specificCols == null
      ? '*'
      : specificCols.map((key, i) => {
        return key
      })
      } FROM ${tableName} ${allRecords == false
        ? 'WHERE ' +
        Object.keys(values).map((key, i) => {
          return key + '=' + "'" + Object.values(values)[i] + "'"
        })
        : ''
      } `
    const replaced_sQ =
      Object.keys(values).length > 1 ? sQ.replace(/[,]/gim, ' AND ') : sQ
    pool.query(replaced_sQ, (e, result) => {
      e ? cb(e, true) : cb(result, false)
    })
  },
  customQuery: (query, cb) => {
    const res = pool.query(query, (e, result) => {
      // prevResultToAppend
      //   ? e
      //     ? cb(e, true)
      //     : cb(result, false, prevResultToAppend)
      //   : e
      //   ? cb(e, true)
      //   : cb(result, false)
      e ? cb(e, true) : cb(result, false)
    })
    return res
  },
  returnDataQuery: async(query) => {
    let res;
    pool.query(query, async(e, result) => {
      if (e) res =  e
      else res = await result
    })
    if(res) console.log(res)
  }
}

module.exports = { pool, sql }
