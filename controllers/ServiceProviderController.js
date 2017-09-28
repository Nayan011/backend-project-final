var ServiceProvider = require('../models/ServiceProvider');
var Customer = require('../models/Customer');

module.exports={

   addServiceProvider:function(req,res)
   {
    
     let serviceProvider=new ServiceProvider({

        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        licenceNo:req.body.licenceNo,
        accountNo:req.body.accountNo,
        bankName:req.body.bankName,

     });
     serviceProvider.save((err,sp)=>{

    if(err)
    {
        console.log(err);
    }
     
     console.log(sp);
     //res.redirect('/providerLogin');
     res.send({sp});
     });


   },
   addService:function(req,res,next){
       
       Customer.findOne({"_id":"59c92126b46e8e29f8b33648"},(err,cus)=>{
        var data={
            
            fromLoc:req.body.fromLoc,
            toLoc:req.body.toLoc,
            pickDate:req.body.pickDate,
            dropDate:req.body.dropDate,
            amountReceived:req.body.amountReceived,
            status:req.body.status,
            customer:cus
        };
    ServiceProvider.update({"email":req.providerEmail },{$push:{"services":data}},(err,service)=>{
 
     console.log(service);
     if(err){res.send(err);}
     res.send({success:"Successfully added."});
 
 
    });

       });

   },

   updateService:function(req,res){

    ServiceProvider.update({"services._id":req.params.id},
    {$set:{"services.$.status":req.body.status,"services.$.amountReceived":req.body.amountReceived}},(err,da)=>{

        console.log(da);
        res.send({success:"Successfully updated."});
    });

   },
   getSingleService:function(req,res){
    ServiceProvider.findOne({"services._id":req.params.id},(err,data)=>{

        var service={};
        service=data.services.find(x=>req.params.id==x._id);
        console.log(service);
        //res.render('./singleService.ejs',{service:service});
        res.send({service});
        
    });
    
   },
   getServiceProviders:(req,res)=>{

    ServiceProvider.find({},(e,d)=>{

      console.log(d);
      res.send({d});
      
    })
   }
   ,
   getCustomers:function(req,res){
    Customer.findOne({email:"engg.nayan@yahoo.com"},(err,customers)=>{
     console.log(customers);
     res.send({customers});
    });


   }
  

}

