const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const Schema=mongoose.Schema;

//Create Schema
const userSchema=new Schema({
    email:{
        type:String,
      
    },
    password:{
        type:String,
        required:true
    }
});
userSchema.pre('save',async function(next){
    try{
        //generate a salt
      const salt=  await bcrypt.genSalt(10);
    const hashedPassword= await bcrypt.hash(this.password,salt);
   /*
    console.log('salet ',salt);
    console.log('normal password ', this.password);
    console.log('Hashed Password ', hashedPassword)
    */
    this.password=hashedPassword;
    next();

    }catch(error){
        next(error);
    }

});

userSchema.methods.isValidPassword=async function(newPassword){
    try{
      return  bcrypt.compare(newPassword,this.password);
    }
    catch(error){
        throw new Error(error);
    }
}
//Create Models
const User=mongoose.model('user',userSchema);
//Export Models
module.exports=User;
