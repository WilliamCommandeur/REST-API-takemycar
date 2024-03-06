const {Router} = require('express');
const {reviewController} = require('../controller');

const router = Router();

router.get('/reviews', reviewController.getReviews);
router.get('/reviews/:id', reviewController.getReviewById);

// router.post('/reviews', reviewController.addReview);
// router.patch('/reviews/:id', reviewController.modifyReview);
// router.delete('/reviews/:id', reviewController.deleteReview);

module.exports = router;