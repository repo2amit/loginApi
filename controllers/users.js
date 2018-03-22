const JWT=require('jsonwebtoken');
const User=require('../models/user');
const {secretKey}=require('../configuration/secret')
signToken=(user)=>{
    return JWT.sign({
        iss:'CodeWrker',
        sub:user.id,
        iat:new Date().getTime(),
        exp:new Date().setDate(new Date().getDate()+1)
    },secretKey);

}

module.exports={
    signUp:async(req,res,next)=>{
        const {email,password}=req.value.body;
        const newUser=new User({email,password});
        //Check the User with the same email
        const foundUser=await User.findOne({email});

        if (foundUser){
          return  res.status(403).json({
                error:'Email Is Registered'
            })
        }
        //create new user
        await newUser.save();

        //respond with token
       // res.json({user:'Created'})
       /*
    const token=   JWT.sign({
           iss:'CodeWrker',
           sub:newUser.id,
           iat:new Date().getTime(),
           exp:new Date().setDate(new Date().getDate()+1)
       },'codewrkerauth');
       */
      const token=signToken(newUser);
       res.status(200).json({token});
       // res.json({user:'Created'})
        /*
       const email=req.value.body.email;
       const password=req.value.body.password;
       */
    },
    signIn:async(req,res,next)=>{
        //GENERATE TOKEN
        const token=signToken(req.user);
        res.status(200).json({token});
        console.log('SucessFul Login')

        console.log('SignIn')
    },
    secret:async(req,res,next)=>{
        //HERE NO NEED TO VALIDATE
        res.json({
            message:'Every thing going okay and you are able to get your resource'
        })
    }

}