let jwt = require('jsonwebtoken')
let user = require('../Model/User')
let serverModel = require('../Model/Server');

let username;

let authMiddleWare = async(req, res, next)=>{

    let token = req.cookies.section;
   
   
    if(token){
        
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, tokenDecoded)=>{

            if(err){
                
                res.json({toLink: '/', msg: 'An error occured plz try again'})
            }else{

                //console.log(tokenDecoded);

                let u = await user.findById(tokenDecoded.id);
                let servers = await serverModel.find();
                res.json({toLink: '', msg: 'You are successfully autheriezed', thisUser: u, allServers: servers})

            }

        })
    
    }else{

        res.json({toLink: '/',  msg: 'Go login or signup first then visit this page'})
    }


    next();
}

module.exports = {authMiddleWare, username};