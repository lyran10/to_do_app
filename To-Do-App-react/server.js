const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const router = require("./routes/routes.js")


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/todo',router);

app.listen(process.env.PORT, () => {
  console.log(`listening to ${process.env.PORT}`)
})

app.use("/",express.static(path.join(__dirname, "client/build")))
app.get("*",(req,res) => {
  res.sendFile(path.resolve(__dirname,"./client/build","index.html"))
})