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
                
                { title: "Sampling", content: "sampling", state: "pending" },
                { title: "Production", content: "stitching", state: "pending" },
                { title: "Quality & Finishing", content: "printing", state: "pending" },

            ]
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

router.get('/summary' , async (req,res) => {
    let summary = {
        open: 0,
        sampling: 0,
        production: 0,
        quality: 0
    }
    await Order.find((err,data) => {
        data.forEach(row => {
            row.orderStatus.forEach(st => {
                if(st === 1){
                    summary.open++;
                }else if(st === 2){
                    summary.production++;
                }else if(st === 3 || st === 4){
                    summary.sampling++;
                }else{
                    summary.quality++;
                }
            })
        })
    });

    res.status(200).send(summary);
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
    console.log('id',id);
    Order.findOneAndUpdate(id , req.body, (err,data) => {
      if(err){
        res.status(500).send(err);
      }else{
        res.status(200).send(data);
      }
    });
});

module.exports = router;
