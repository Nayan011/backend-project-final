var ProviderService = require('../models/ServiceProvider');
var config = require('../config');
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
var jwt = require('jsonwebtoken');
module.exports={
ServiceProviderLogin:function(req, res,next) {
	if(req.body!==null)
     {
     	//req.session.providerEmail=req.body.email;
     }
   
	  // find the user
	  ProviderService.findOne({email: req.body.email},function(err, provider) {//starts Customer.findOne method
       console.log(provider);
       //console.log('user id: '+customer._id);
       //req.session.id=customer._id;

	    if (err) throw err;

	    // no user with that username was found
	    if (!provider) {// checks customer or not starts
	      res.redirect('/providerLogin');
	    }// ends customer checking

	    if (provider) {// checks if customer

	      // check if password matches
	      var validPassword = provider.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      }
	       else {


             // req.session.providerEmail=provider.email;
              var token = jwt.sign({ email: provider.email }, config.secret, { expiresIn: "60 days" });
              res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
              //res.render('./providerProfile.ejs',{provider:provider});
              res.send({provider});


          }
        
         
	        
	      }   //ends checking if customer

	    });//ends customer.findOne method

	  
	},// ends customerLogin function

	providerLogout:function(req,res){

		res.cookie('nToken',0);
		//res.redirect('/providerLogin');
	}
}