const User = require('../models/user');
var mongdb = require('mongodb');
module.exports={
//GET ALL USERS
  get:function(req,res){
    User.find({},(err,doc)=>{
      res.send(doc)
    })

  },

//ADD USER
  add:function(req,res){
    const user = new User(req.body);
     user.save((err,doc)=>{
       if(err){
         res.send({
           status:false,
           error:err
         })
       }
       else{
         res.send(doc)
       }
     })
   },

// DELETE User
   del:function(req,res){
     // var id = req.params.id;
     User.findByIdAndRemove({ _id: req.params.id},(err,doc)=>{
       if(err){
         res.send({
           status:false,
           error:err
         })
       }
       else{
         // res.send(doc);
         res.send({
         status:true
       });

       }
     })
   },

// UPDATE USER

  edit:function(req,res){
    // const user = new User(req.body);
    User.updateOne({ _id: req.params.id} ,{ $set:
      {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        role:req.body.role,
        password:req.body.password,
        country:req.body.country
    },
    },(err,doc)=>{
      if(err){
        res.send({
          status:false,
          error:err
        })
      }
      else{
        res.send(doc);
      //   res.send({
      //   status:true
      // });

      }
    })
  }
}
