const Listing = require("../models/listingSchema");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.json(allListings);
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.image = { url, filename };
  newListing.owner = req.user._id;
  await newListing.save();
  console.log(newListing);
  res.json(newListing);
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    return res.status(404).json({ error: "listing not found" });
  }
  // console.log(listing);
  res.json(listing);
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.json(listing);
};

module.exports.updateListing = async (req, res) => {
  if (!req.body.listing) {
    throw new ExpressError(400, "Send a valid data for listing");
  }
  let { id } = req.params;
  let listing = await Listing.findById(id);

  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  const updatedListing = await Listing.findByIdAndUpdate(id, {
    ...req.body.listing,
  });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  res.json(updatedListing);
};

module.exports.destroyListing = async (req, res) => {
  const { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  res.json(deletedListing);
};
