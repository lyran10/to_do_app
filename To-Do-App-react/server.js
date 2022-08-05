const express = require("express")
const app = express()
const bodyParser = require("body-parser")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get("/",(req,res) => {
  console.log("hello")
})



app.listen(4000, () => {
  console.log(`listening to 4000`)
})