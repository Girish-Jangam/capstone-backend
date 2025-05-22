const express = require('express');
const router = express.Router();
const ReviewService=require('../Services/review');

router.post('/add', async(req,res)=>{
    try{
        const review=await ReviewService.addReview(req.body);
        res.status(201).json(review);
    }
    catch(error){
        res.status(500).json({error: 'Failed to add review' });
    }
});
 
router.get('/', async (req,res)=>{
    try{
        const reviews= await ReviewService.getReviews();
        res.json(reviews);
    }catch(error){
    res.status(500).json({ error:'Failed to fetch reviews' });
    }
});

router.get('/filter', async(req,res)=>{
    try{
        const{destination}= req.query;
        const reviews = await ReviewService.getReviews({destination});  
        res.json(reviews);
    }
    catch(error){
res.status(500).json({error: 'Failed to filter reviews'});
    }
});

module.exports=router;