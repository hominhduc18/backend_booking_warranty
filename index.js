const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');





dotenv.config();

const userRoute = require('./router/user');
const employeeRoute = require('./router/employee');
const maintenanceRoute = require('./router/maintenance');
const AdminRoute = require('./router/admin');
const ggMap = require('./router/map');

app.use(cors());
app.use(cookieParser());
app.use(express.json());




// app.use(
//     express.urlencoded({
//         extended: true,
//     }),
// );


// mongoose.connect("mongodb://localhost:27017/DATN", (err) => {
//     if(!err) console.log('database connected');
//     else console.log('database disconnected')
// })


mongoose.connect(process.env.URL,()=>{
    console.log("connect started");
})
   
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => { res.send("HOME");});

app.use("/v1/user", userRoute);
app.use("/v1/employee", employeeRoute);


app.use("/v1/maintenance", maintenanceRoute);


app.use("/v1/admin", AdminRoute);

/////////
// Set static folder


// Routes
// app.use('/v1/map', ggMap);


app.listen(8000,() => {
    console.log('server is running on port');
})