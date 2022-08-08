const express = require("express")
const dotenv = require('dotenv')
const path = require('path')
const cors = require('cors');
const bodyParser = require("body-parser")
const router = require("./routes/routes.js")

dotenv.config();
const app = express()
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.listen(process.env.PORT, () => {
  console.log(`listening to ${process.env.PORT}`)
})

app.use('/todo',router)

app.use("/",express.static(path.join(__dirname, 'client/build')));
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname,'./client/build','index.html'))
})
