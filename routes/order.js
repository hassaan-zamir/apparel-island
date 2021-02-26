var Order = require('../models/Order.js');
var auth = require('../middleware/AuthMiddleware.js');
var express = require('express');


const router = express.Router();


router.get('/find/:id' , (req,res) => {
    const id = req.params.id;
    Order.findById(id, (err,data) => {
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data);
        }
    })
});

router.post('/new'  , (req,res) => {

    let payload = req.body;
    
    payload['startTime'] = ((new Date()).getTime());
    payload['phases'] = [
        {
            title: "Corporate Office",
            content: "Sales Content",
            state: "active"
        },
        {
            title: "Design Team",
            content: "Design Content",
            state: "pending",
            nested: [
                { title: "Gather data from client" , content: "gather data", state: "pending"},
                { title: "Mockup in progress" , content: "mockup", state: "pending"},
                { title: "Approved by the client" , content: "approved", state: "pending"}
            ]
        },
        {
            title: "Factory",
            content: "Manufacturing Team Content",
            state: "pending",
            nested: [
                { title: "Fabric", content: "fabric", state: "pending" },
                { title: "Cutting", content: "cutting", state: "pending" },
                { title: "Stitching", content: "stitching", state: "pending" },
                { title: "Printing/Embroidery", content: "printing", state: "pending" },
                { title: "Finishing/Packing", content: "finishing", state: "pending" }
            ]
        },
        {
            title: "Quality Control",
            content: "Quality Control Content",
            state: "pending"
        },
        {
            title: "Shipping",
            content: "Shipping Content",
            state: "pending"
        }
    ];

    Order.create(payload , (err,data) => {
        if(err) {
            res.status(500).send(err);
        }else{
            res.status(201).send(data);
        }
    })
});

router.get('/sync/:page' , (req,res) => {

    const page = req.params.page;
    Order.paginate({}, { sort:{ startTime: -1}, page: page, limit: 10 }, function(err, result) {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(result);
        }
    });
});

router.get('/all' , (req,res) => {
    Order.find((err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });
});

router.post('/delete/:id' , (req,res) => {
    const id = req.params.id;
    Order.findOneAndDelete(id, (err,data) => {
        if(err){
            res.status(500).send(err);
        }else{
            res.status(200).send(data);
        }
    });

});

router.post('/update/:id' , (req,res) => {
    const id = req.params.id;
    Order.findOneAndUpdate(id , req.body, (err,data) => {
      if(err){
        res.status(500).send(err);
      }else{
        res.status(200).send(data);
      }
    });
});

module.exports = router;
