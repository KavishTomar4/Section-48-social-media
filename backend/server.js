require('dotenv').config()
//modules importation
let express = require('express')
let mongoose = require('mongoose')
let authApi = require('./Routes/auth')
let cookieParser = require('cookie-parser')
let http = require('http')
let {Server} = require('socket.io')





//express and socket.io instantiation
let app = express()
let port = process.env.PORT || 4000
let server = http.createServer(app)
let io = new Server(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    },
    maxHttpBufferSize: 5e8
})

//socket io client server interactions
io.on("connection", (socket)=>{

    let roomname;

    socket.on('join', (params, callback)=>{
        socket.join(params.room);

        roomname = params.room;
        
    })

    socket.on("roomMsg", (arg)=>{
        socket.to(roomname).emit('userMsg' , {username: arg.username, data : arg.message});
    });

    socket.on("sendImg",(arg)=>{

       
        socket.to(roomname).emit('emitedImg', {username: arg.username, data: arg.image});
    });

    socket.on("sendAudio", (arg)=>{
        socket.to(roomname).emit('emitedAudio', {username: arg.username, data: arg.audio});
    })

    socket.on("sendVideo", (arg)=>{
        socket.to(roomname).emit('emitedVideo', {username: arg.username, data: arg.video});
    })

 


})






//middleware
app.use(cookieParser())
app.use(express.json({limit: '100mb'}))
app.use('/api', authApi)




//database connection
let dburl = process.env.DATABASE
mongoose.connect(dburl)
let con = mongoose.connection

con.on('open', ()=>{

    server.listen(port, ()=>{

        console.log(`This server is listening on ${port}`)
    
    })

})





