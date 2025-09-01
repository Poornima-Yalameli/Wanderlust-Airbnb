import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

function ShowReview({ reviews, listingId }) {
  return (
    <div className="col-12 col-md-8 offset-md-3 px-2 mb-3">
      <hr />
      <p>All Reviews</p>
      <div className="row">
        {reviews.map((review) => (
          <div
            className="card col-md-5 col-11 ms-md-3 ms-3 mb-3"
            key={review._id}
          >
            <div className="card-body">
              <h5 className="card-title">@{review.author.username}</h5>
              <p className="card-text">{review.comment}</p>
              <Rating
                name="read-only"
                value={review.rating}
                readOnly
                precision={1}
              />
              <div className="mb-3">
                <Link
                  className="btn btn-sm btn-dark"
                  to={`/listings/${listingId}/reviews/${review._id}/delete`}
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default ShowReview;
