const controllerUtil = require('../util/controller');
const { reviewDatamapper } = require('../datamapper');

module.exports = {
  /**
   * Récupération de tous les commentaires
   */
  async getReviews(_, res, next) {
    const { result, error } = await reviewDatamapper.findReviews();
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Récupération d'un commentaire par son ID
   * @param {*} req Requête d'Express
   * @param {*} res Réponse d'Express
   * @param {*} next 
   */
  async getReviewById(req, res, next) {
    const reviewId = req.params.id;
    const { result, error } = await reviewDatamapper.findReviewById(reviewId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Ajout d'un commentaire
   */
  async addReview(req, res, next) {
    const review = req.body;
    const { result, error } = await reviewDatamapper.insertReview(review);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Suppression d'un commentaire par son ID
   */
  async deleteReview(req, res, next) {
    const reviewId = req.params.id;
    const { result, error } = await reviewDatamapper.destroyReview(reviewId);
    controllerUtil.manageResponse(error, result, res, next);
  },

  /**
   * Modification d'un commentaire par son ID
   */
  async modifyReview(req, res, next) {
    const reviewId = req.params.id;
    const review = req.body;
    const { result, error } = await reviewDatamapper.updateReview(reviewId, review);
    controllerUtil.manageResponse(error, result, res, next);
  }
};
