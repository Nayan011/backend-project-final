var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var CustomerSchema = new Schema({


        name:String,
        email: {
        type: String,
      
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
         },
         password:String,
      mobileno:Number,
      transactions:
      [
       {
           fromLoc:String,
           toLoc:String,
           pickDate:Date,
           dropDate:Date,
           budget:Number,
           status:String
            
     }

      ]
    

 });

// hash the password before the user is saved
 CustomerSchema.pre('save', function(next) {
   var provider = this;
 // hash the password only if the password has been changed or user is new
 if (!provider.isModified('password')) return next();

 // generate the hash
 bcrypt.hash(provider.password, null, null, function(err, hash) {
 if (err) return next(err);

// change the password to the hashed version
  provider.password = hash;
  next();
  });
});

 // method to compare a given password with the database hash
CustomerSchema.methods.comparePassword = function(password) {
var provider = this;

return bcrypt.compareSync(password, provider.password);
};
module.exports = mongoose.model('Customer', CustomerSchema);