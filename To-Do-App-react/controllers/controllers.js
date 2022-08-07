// reqiuring from the module.js file
const {
  _deleteData,
  _updateData,
  _postData,
_getData,
_checkedData} = require("../modules/module.js");

// this function is going to send the data to the database by using Knex to create an order
const postData = (req, res) => {
  _postData(req.body)
  .then(result=>{
    res.json(result)
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({msg:'not found'})
  })
}

const getData = (req, res) => {
  _getData()
  .then(result=>{
    res.json(result)
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({msg:'not found'})
  })
}

// this function is going to delete the data in the database by using Knex
const deleteData = (req,res)=>{
  console.log(req.body)
  _deleteData(req.body.task)
  .then(result=>{
    res.json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({msg:'not found'})
  })
}

const checkedData = (req,res)=>{
  _checkedData(req.body.checkedBoxList)
  .then(result=>{
    res.json(result);
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({msg:'not found'})
  })
}

// this function is going to update the data in the database by using Knex
const updateData = (req, res) => {
  _updateData(req.body.id, req.body)
  .then(result=>{
    res.json(result)
  })
  .catch(err=>{
    console.log(err);
    res.status(404).json({msg:'not found'})
  })
}

// exporting to the routes.js file
module.exports = {postData,deleteData,updateData,getData,checkedData}
