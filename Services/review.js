const Review = require('../Model/review');

class ReviewService{
    async addReview(reviewData){
        const review=new Review(reviewData);
        return await review.save();
    }

    async getReviews(filter={}){
        return await Review.find(filter);
    }
}
 
module.exports=new ReviewService();