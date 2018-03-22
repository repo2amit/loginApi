const passport=require('passport');
const JWT_Stretgey=require('passport-jwt').Strategy;
const {ExtractJwt}=require('passport-jwt');
const LocalStrategy=require('passport-local').Strategy;

const {secretKey}=require('./configuration/secret');
const User=require('./models/user');


//JWt Strategey
passport.use(new JWT_Stretgey({ 
    jwtFromRequest:ExtractJwt.fromHeader('authorization'),
    secretOrKey:secretKey
},async(payload,done)=>{
    try{
        //find the user specified Token
        const user=await User.findById(payload.sub); 
        //if user doesn't exists, handle it
        if(!user){
            return done(null,false);
        }
        
        //otherwise, return user
        done(null,user);

    }catch(error){
        done(error,false);
    }
}));

//Local Strategey

passport.use(new LocalStrategy({
    usernameField:'email'
},async(email,password,done)=>{
    try{
         //find the user given the email
    const user=await User.findOne({email});

    //if not handle it

    if(!user){
        return done(null,false);
    }

    //check the password is correct
  const isMatch= await user.isValidPassword(password);

    //if not handle it 
    if(!isMatch){
        return done(null,false)
    }
    done(null,user);

    //otherwise , return the user

    }catch(error){
        done(error,false);
    }



   
}))