var CustomerService = require('../models/Customer');
var config = require('../config');
var express = require('express')
var cookieParser = require('cookie-parser')

var app = express()
app.use(cookieParser())
var jwt = require('jsonwebtoken');
module.exports={
CustomerLogin:function(req, res,next) {
	if(req.body!==null)
     {
     	//req.session.providerEmail=req.body.email;
     }
   
	  // find the user
	  CustomerService.findOne({email: req.body.email},function(err, CustDetail) {//starts Customer.findOne method
       console.log(CustDetail);
       //res.render('./CustomerProfile.ejs',{customer:CustDetail});
       //console.log('user id: '+customer._id);
       //req.session.id=customer._id;
       res.send({CustDetail});

	    if (err) throw err;

	    // no user with that username was found
	    if (!CustDetail) {// checks customer or not starts
	      res.redirect('/CustomerLogin');
	    }// ends customer checking

	    if (CustDetail) {// checks if customer

	      // check if password matches
	      var validPassword = CustDetail.comparePassword(req.body.password);
	      if (!validPassword) {
	        res.json({ 
	        	success: false, 
	        	message: 'Authentication failed. Wrong password.' 
	      	});
	      }
	       else {


              req.session.providerEmail=CustDetail.email;
              var token = jwt.sign({ email: CustDetail.email }, config.secret, { expiresIn: "60 days" });
              res.cookie('CusToken', token, { maxAge: 900000, httpOnly: true });
              //res.render('./CustomerProfile.ejs',{customer:CustDetail});
              console.log("data from auth"+CustDetail);


          }
        
         
	        
	      }   //ends checking if customer

	    });//ends customer.findOne method

	  
	},// ends customerLogin function

	customerLogout:function(req,res){

		res.cookie('CusToken',0);
		res.redirect('/login');
	}
}