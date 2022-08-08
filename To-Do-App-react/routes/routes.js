const express = require("express")
// all the function which are used to store and update or delete from thr database
const {postData,deleteData,updateData,getData,checkedData} = require("../controllers/controllers.js")
const router = express.Router()


//router
router.get('/getdata', getData)
// using post method to create an order by using the createOrder function
router.post('/postdata', postData)
// using delete method to delete an order by using the deleteOrder function
router.delete('/delete',deleteData);

router.delete('/checked',checkedData);
// using put method to upadate an order by using the updateOrder function
router.put('/update',updateData);

//exporting the router
module.exports = router