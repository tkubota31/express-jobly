const { BadRequestError } = require("../expressError");

//dataToUpdate is updated data from req.body
//jsToSql is to conver to column name variables

function sqlForPartialUpdate(dataToUpdate, jsToSql) {
//Creates array of the keys from dataToUpdate
//Checks if there is anything present in the array
  const keys = Object.keys(dataToUpdate);
  if (keys.length === 0) throw new BadRequestError("No data");


  // {firstName: 'Aliya', age: 32} => ['"first_name"=$1', '"age"=$2']
  //take object jsToSql and convert it into an array
  const cols = keys.map((colName, idx) =>
      `"${jsToSql[colName] || colName}"=$${idx + 1}`,
  );

//takes cols array and creates string separated by comma
// return in format like this: { setCols: '"first_name"=$1, "age"=$2', values: ['Aliya', 32] }
  return {
    setCols: cols.join(", "),
    values: Object.values(dataToUpdate),
  };
}

module.exports = { sqlForPartialUpdate };
