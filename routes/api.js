const express = require('express');

const router = express.Router();

const Ninja = require('../models/ninja');

// get ninjas from database
router.get('/ninjas', (req , res, next)=>{
  // Ninja.find({}).then(()=>{})
  // res.send({type: 'GET'});
  // Ninja.aggregate([
  //   {
  //   '$geoNear': { "near": {type: 'Point', coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)]},
  //                 maxDistance: 100000 , spherical: true
  //               }
  //   }
  //
  // ]).then((ninjas)=>{
  //   res.send(ninjas);
  //
  // });
  // }
  Ninja.aggregate([
   {
     '$geoNear': {
                    near: { type: "Point",
                    coordinates: [parseFloat(req.body.lng), parseFloat(req.body.lat)] },
                    spherical: true,
                    distanceField: 'dist',
                    maxDistance: 100000
                }
            }
        ])
        .then(ninjas => res.send(ninjas))
        .catch(next);



});
//-----------------------------------------


//add ninjas in the database
router.post('/ninjas', (req , res, next)=>{
  // console.log(req.body);
  // var ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body).then((ninja)=>{

    res.send(ninja);

  }).catch(next);

});
//--------------------------------------


//update ninja in the database
router.put('/ninjas/:id', (req , res, next)=>{
  Ninja.findOneAndUpdate({_id: req.params.id}, req.body).then(()=>{
    Ninja.findOne({_id: req.params.id}).then((ninja)=>{
        res.send(ninja);
    });

  });

});
//----------------------------------------------


// delete ninja from database
router.delete('/ninjas/:id', (req , res, next)=>{
  // console.log(req.params.id);
  Ninja.findOneAndDelete({_id: req.params.id}).then((ninja)=>{
    res.send(ninja);

  });
  // res.send({type: 'DELETE'});
});
//------------------------------------------

module.exports = router;
