module.exports={
    signToken=(user)=>{
        return JWT.sign({
            iss:'CodeWrker',
            sub:user.id,
            iat:new Date().getTime(),
            exp:new Date().setDate(new Date().getDate()+1)
        },secretKey);
    
    }
}