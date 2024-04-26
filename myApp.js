let express = require('express');
let app = express();
require('dotenv').config()

app.use("/public", express.static(__dirname + '/public'))

app.get("/",(req,res)=> {

const absolutePath = __dirname +'/views/index.html'
    res.sendFile(absolutePath);
})
console.log("sape",process.env.MESSAGE_STYLE)
app.use((req,res,next)=>{
    const mesj = req.method +" "+req.path+' - ::ffff:'+req.ip
    console.log(mesj);
    next();
})
app.get("/json",(req,res)=> {
const response= {"message": process.env.MESSAGE_STYLE==='uppercase' ? "HELLO JSON":"Hello json"}
    res.json(response)
    })

























module.exports = app;
