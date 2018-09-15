const Admin = require('../models/admin');
module.exports={
  //GET ADMIN LOGGED DATA
  get:function(req,res){
    Admin.find({},(err,doc)=>{
      res.send(doc)
    })
  },

  //ADD ADMIN
  add:function(req,res){
    const admin = new Admin(req.body);
     admin.save((err,doc)=>{
       if(err){
         res.send({
           status:false,
           error:err
         })
       }
       else{
         res.send({
           status:true
         })
       }
     })
   },

   // DELETE ADMIN
   // del:function(req,res){
   //     // var id = req.params.id;
   //     Admin.findByIdAndRemove({ _id: req.params.id},(err,doc)=>{
   //       if(err){
   //         res.send({
   //           status:false,
   //           error:err
   //         })
   //       }
   //       else{
   //         res.send(doc);
   //       //   res.send({
   //       //   status:true
   //       // });
   //
   //       }
   //     })
   //   },
   del:function(req,res){
       Admin.remove({},(err,doc)=>{
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
     }


}
