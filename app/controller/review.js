const controllerUtil = require('../util/controller');
const {reviewDatamapper} = require('../datamapper');

module.exports = {
    async getReviews(req, res, next){
        const {result, error} = await reviewDatamapper.findReviews();
        controllerUtil.manageResponse(error, result, res, next);
    },

    async getReviewById(req, res, next){
        const reviewId = req.params.id;
        const {result, error} = await reviewDatamapper.findReviewById(reviewId);
        controllerUtil.manageResponse(error, result, res, next);
    },
}