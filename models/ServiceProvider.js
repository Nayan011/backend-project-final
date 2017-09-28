var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

// user schema
var ServicePSchema = new Schema({


        name:String,
        email: {
        type: String,
      
        match: [/.+\@.+\..+/, "Please fill a valid e-mail address"]
         },
         password:String,
        licenceNo:String,
        accountNo:Number,
        bankName:String,
        mobileNo:Number,
      services:
      [
       {
           fromLoc:String,
           toLoc:String,
           pickDate:Date,
           dropDate:Date,
           amountReceived:Number,
           status:String,
           customer: {
           type: mongoose.Schema.Types.ObjectId,
           ref: 'Customer'
         }
       }

      ]
    

 });

// hash the password before the user is saved
 ServicePSchema.pre('save', function(next) {
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
ServicePSchema.methods.comparePassword = function(password) {
var provider = this;

return bcrypt.compareSync(password, provider.password);
};

module.exports = mongoose.model('ServiceProvider', ServicePSchema);