import Rating from "@mui/material/Rating";
import { useEffect, useState, useRef } from "react";
import { formValidation } from "../../js/Script";
import { useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function Review({ currentUser, onReviewAdded }) {
  const { id } = useParams();

  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const [error, setError] = useState("");

  const formRef = useRef(null);

  useEffect(() => {
    formValidation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!comment.trim()) {
      setError("Please enter a comment before submitting.");
      return;
    }

    const reviewData = {
      review: {
        rating: rating || 1,
        comment,
      },
    };
    if (rating !== null) {
      reviewData.review.rating = rating;
    }
    try {
      const res = await fetch(`${apiUrl}/listings/${id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(reviewData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }

      setRating(null);
      setComment("");

      formRef.current.classList.remove("was-validated");
      setError("");

      if (onReviewAdded) {
        await onReviewAdded();
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="col-12 col-md-8 offset-md-3 px-2 mb-3">
      {currentUser && (
        <>
          <hr />
          <h4>Leave a Review</h4>

          {error ? (
            <div className="alert alert-danger col-12 col-md-6 offset-md-3">
              {error}
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="needs-validation"
              noValidate
            >
              <div className="mb-3 mt-3">
                <Rating
                  name="size-medium"
                  value={rating}
                  onChange={(e, newValue) => setRating(newValue)}
                />
              </div>
              <div className="mb-3 mt-3">
                <label htmlFor="comment" className="form-label">
                  Comments
                </label>
                <textarea
                  name="review[comment]"
                  id="comment"
                  cols="30"
                  rows="5"
                  className="form-control"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <div className="invalid-feedback">
                  Please add some comments for review
                </div>
              </div>
              <button type="submit" className="btn btn-outline-danger">
                Submit
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
export default Review;
