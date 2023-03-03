const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const dotenv = require('dotenv');

const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');

const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

dotenv.config();

const userRoute = require('./router/user');
const employeeRoute = require('./router/employee');
const maintenanceRoute = require('./router/maintenance');
const AdminRoute = require('./router/admin');

const ggMap = require('./router/map');

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

// const socketIo = require("socket.io")(server, {
//     cors: {
//         origin: "*",
//     }
//   }); 
  // nhớ thêm cái cors này để tránh bị Exception nhé :D  ở đây mình làm nhanh nên cho phép tất cả các trang đều cors được. 


// socketIo.on("connection", (socket) => { ///Handle khi có connect từ client tới
//   console.log("New client connected" + socket.id); 

//   socket.on("sendDataClient", function(data) { // Handle khi có sự kiện tên là sendDataClient từ phía client
//     socketIo.emit("sendDataServer", { data });// phát sự kiện  có tên sendDataServer cùng với dữ liệu tin nhắn từ phía server
//   })

//   socket.on("disconnect", () => {
//     console.log("Client disconnected"); // Khi client disconnect thì log ra terminal.
//   });
// });

app.use(
    express.urlencoded({
        extended: true,
    }),
);


// mongoose.connect("mongodb://localhost:27017/DATN", (err) => {
//     if(!err) console.log('database connected');
//     else console.log('database disconnected')
// })


mongoose.connect(`mongodb+srv://hominhduc18:586632hmd@cluster0.4plxshe.mongodb.net/?retryWrites=true&w=majority`,()=>{
    console.log("connect started");
})
   
// app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res) => { res.send("HOME");});

app.use("/v1/user", userRoute);
app.use("/v1/employee", employeeRoute);


app.use("/v1/maintenance", maintenanceRoute);


app.use("/v1/admin", AdminRoute);


/////////
// Set static folder


// Routes
// app.use('/v1/locations', ggMap);

// server.listen(8000, () => {
//     console.log('Server đang chay tren cong 8000');
// });
app.listen(8000,() => {
    console.log('server is running on port');
})