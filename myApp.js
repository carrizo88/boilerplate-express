let express = require('express');
let app = express();
require('dotenv').config()
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use("/public", express.static(__dirname + '/public'))

app.get("/", (req, res) => {
    const absolutePath = __dirname + '/views/index.html'
    res.sendFile(absolutePath);
})

app.use((req, res, next) => {
    const mesj = req.method + " " + req.path + ' - ::ffff:' + req.ip
    console.log(mesj);
    next();
})

app.get("/json", (req, res) => {
    const response = { "message": process.env.MESSAGE_STYLE === 'uppercase' ? "HELLO JSON" : "Hello json" }
    res.json(response)
})


app.get('/now',(req, res, next) => {
    const timestamp = new Date().toString()
    console.log(timestamp);
    req.time=timestamp
    next();
},(req,res) => {
    res.json({time: req.time})
})

app.get('/:word/echo',(req,res)=> {
    res.json({echo: req.params.word})
})

app.get("/name", (req, res) => {
    console.log('req.query',req.query)
    const {first, last} =  req.query
    const resp={ name: `${first} ${last}`}
    res.json(resp)
})

app.post("/name", (req, res) => {
    console.log('req',req.body)
    const {first, last} =  req.body
    const resp={ name: `${first} ${last}`}
    res.json(resp)
})















module.exports = app;
