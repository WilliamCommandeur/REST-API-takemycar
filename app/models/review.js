class Review {
  constructor(authorId, targetId, rating, comment) {
    this.authorId = authorId;
    this.targetId = targetId;
    this.rating = rating;
    this.comment = comment;
  }
}

module.exports = Review;
