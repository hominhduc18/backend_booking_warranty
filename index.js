const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');
const app = express();
const cookieParser = require('cookie-parser');


const authRoute = require('./router/auth');
const employeeRoute = require('./router/employee');
const maintenanceRoute = require('./router/maintenance');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

// app.use(
//     express.urlencoded({
//         extended: true,
//     }),
// );

// Kết nối với mongoDB
mongoose.connect("mongodb://localhost:27017/DATN", (err) => {
    if(!err) console.log('database connected');
    else console.log('database disconnected')
})




app.use("/v1/auth", authRoute);
app.use("/v1/employee", employeeRoute);




app.use("/v1/maintenance", maintenanceRoute);
app.listen(8000,() => {
    console.log('server is running on port');
})