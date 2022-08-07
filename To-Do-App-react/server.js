const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = require("./routes/routes.js")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/todo',router);

app.listen(4000, () => {
  console.log(`listening to 4000`)
})