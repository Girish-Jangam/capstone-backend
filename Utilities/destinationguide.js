// backend/utils/destinationGuideUtils.js
// For example, you can have utilities to validate review structure or format data.

const validateReview = (review) => {
    if (!review.user || !review.rating || !review.comment) {
      throw new Error('Invalid review data');
    }
  };
  
  module.exports = {
    validateReview,
  };
  