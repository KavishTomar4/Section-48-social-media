require('dotenv').config()
//importing libraries
let express = require('express')
let routes = express.Router();
let user = require('../Model/User')
let bcrypt = require('bcrypt')
let jwt = require('jsonwebtoken')
let {authMiddleWare} = require('../middleware/authMiddleWare')
let serversModel = require('../Model/Server');
const Server = require('../Model/Server');








//token
let authToken = (id , days, hours, minutes, seconds)=>{

    return jwt.sign({id}, process.env.TOKEN_SECRET, { expiresIn: days*hours*minutes*seconds})

}

//post register api
routes.post('/register', async(req, res)=>{

    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(req.body.password, salt)

    //console.log(req.body.imgUrl)

    let u = new user({
        username: req.body.username,
        firstname : req.body.fname,
        lastname : req.body.lname,
        email: req.body.email,
        password : hashedPassword,
        img: req.body.imgUrl

    })

    try{

        let a1 = await u.save();

        let token = authToken(a1._id, 20, 24, 60, 60)
        res.cookie('section', token, {httpOnly: true, maxAge: 20*24*60*60*1000 })


        res.status(200).json({toLink: '/'});

    }catch(err){

         res.status(400).json(err);

    }




});

//getting login token at login page
routes.get('/getlogin', (req, res)=>{

   let token = req.cookies.section;

   if(token){

    jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenDecoded)=>{

        if(err){
            res.json({toLink: '/'});
        }else{

            res.json({toLink: '/home'});

        }

    });
   
   }

});

//for posting login details for login
routes.post('/login', async(req, res)=>{

    let username = req.body.username
    let password = req.body.password
    let u = await user.findOne({username})
    //console.log(u);
    let token = req.cookies.section;

    if(token){

        jwt.verify(token, process.env.TOKEN_SECRET, (err, tokenDecoded)=>{

            if(err){
                console.log(err)
                res.json({toLink: '/'})
            }else{

                
                res.json({toLink: '/home'})

            }

        })

    }else{

        if(u){
            //console.log('getting token')
            if(await bcrypt.compare(password, u.password)){
                let t = authToken(u._id, 20, 24, 60, 60)
                res.cookie('section', t, {httpOnly: true, maxAge: 20*24*60*60*1000 })
                res.json({toLink: '/home'});
            }else{
                res.json({toLink: '/'});
            }
        }else{

            res.json({toLink: '/'});

        }

    }

    

})

//for home page
routes.get('/home', authMiddleWare, async(req, res)=>{

   
})

//getting the data for profile page
routes.get('/profile', (req, res)=>{

    let t = req.cookies.section;

    if(t){
       jwt.verify(t, process.env.TOKEN_SECRET, async(err, decodedToken)=>{

            if(err){
                console.log(err)
            }else{

                let u = await user.findById(decodedToken.id);

              res.json({toLink: '', user: u})

            }

       })
    }else{
        res.json({toLink: '/'})
    }

})

//posting details for creating a server
routes.post('/createserver', async(req, res)=>{

    let cookie = req.cookies.section;


    //console.log(cookie.id);
    let u = await user.findOne(cookie.id);
    //console.log(u);

    let s = new serversModel({
        img: req.body.img,
        roomname: req.body.roomname,
        users: u.username
         
    })

    try{

        let a1 = await s.save();
        res.json({roomLink: '/room/'+req.body.roomname, roomname: a1.roomname})

    }catch(err){

    }

})

//for getting access to a particular room
routes.get('/room/:roomname', async(req, res)=>{

    let cookie = req.cookies.section;

   
    if(cookie){
        jwt.verify(cookie, process.env.TOKEN_SECRET, async(err, tokenDecoded)=>{
            let serverModel;
            let u 
            if(err){
                console.log(err);
            }else{
                serverModel = await Server.findOne({roomname: req.params.roomname});

                let addNewUser = false;
                let un;

                u = await user.findById(tokenDecoded.id);
                
                for(let i = 0; i < serverModel.users.length; i++){
        
                un = serverModel.users[i];

                if(un == u.username){
                    addNewUser = true
                }

            }

    
            if(!addNewUser){
    
                serverModel.users.push(u.username);
                serverModel.save();

        }
   

            res.json({members: serverModel.users, currentUser: u.username, serverName: serverModel.roomname, serverIcon: serverModel.img});




                
            }

        })
    }



   
   

})

//for other user's profile page
routes.get('/profile/:profilename', async(req, res)=>{

    let token = req.cookies.section;
    
    let u = await user.findOne({username: req.params.profilename});
    
    if(token){

        res.json({toLink: '', profileUser: u});

    }else{
        res.json({toLink: '/'});
    }
    
    

});

routes.get('/editpage', (req, res)=>{

    let token = req.cookies.section;

    if(token){

        jwt.verify(token, process.env.TOKEN_SECRET, async(err, tokenDecoded)=>{

            if(err){
                res.json({toLink: '/edit'});
            }else{
               
                let u = await user.findById(tokenDecoded.id)

                res.json({you: u});
            
            }

        })

    }else{
        res.json({toLink: '/'});
    }

})


routes.post('/editprofile', (req, res)=>{

    let token = req.cookies.section;

    if(token){

        jwt.verify(token, process.env.TOKEN_SECRET, async(err, tokenDecoded)=>{

            if(err){
                res.json({toLink: '/edit'});
            }else{
                let u = await user.findById(tokenDecoded.id)

                if(u){

                    if(req.body.username != null){
                        u.username = req.body.username;
                    }

                    if(req.body.fname != null){
                        u.firstname = req.body.fname;
                    }
                    
                    if(req.body.lname != null){
                        u.lastname = req.body.lname;
                    }
                    if(req.body.img != null){
                        u.img = req.body.img;
                    }

                    if(req.body.bio != null){
                        u.bio = req.body.bio;
                    }
                    let a1 = await u.save();

                    res.json({toLink: '/profile'});

                }
            }

        })

    }else{
        res.json({toLink: '/'});
    }

})

routes.get('/logout', (req, res)=>{

    let token = req.cookies.section;

    if(token){

        res.cookie('section', null, {maxAge: 1});

        res.json({toLink: '/'});

    }

})



module.exports = routes