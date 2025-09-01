const Listing = require("./models/listingSchema");
const Review = require("./models/reviewSchema");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    // return res
    //   .status(401)
    //   .json({ error: "You must be logged in to create a listing." });

    res
      .status(401)
      .json({ error: "You must be logged in to perform this action." });
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    return res
      .status(403)
      .json({ error: "your are not the author of this listing" });
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMSg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMSg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);

  if (error) {
    let errMSg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMSg);
  } else {
    next();
  }
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currUser._id)) {
    return res
      .status(403)
      .json({ error: "your are not the author of this review" });
  }
  next();
};
