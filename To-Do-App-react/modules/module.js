//reqiuring the database connection
let db = require("../connections/connections.js")

// inserting the data in the database
const _postData = (data) => {
  return db('to_do_list')
  .insert(data)
  .returning('*')
}

const _getData = () => {
  return db('to_do_list')
  .returning('*')
  .orderBy("id","asc")
}

// delete from the database
const _deleteData = (taskId) => {
  return db('to_do_list')
  .del()
  .where({id: taskId})
  .returning('*')
}

const _checkedData = (array) => {
  return db('to_do_list')
  .del()
  .whereIn("id",array)
  .returning('*')
}

// update the database
const _updateData = (id,data) => {
  return db('to_do_list')
  .update(data)
  .where({id: id})
  .returning('*')
}

// exporting the functions to the controller.js
module.exports = {_postData,_deleteData,_updateData,_getData,_checkedData}

