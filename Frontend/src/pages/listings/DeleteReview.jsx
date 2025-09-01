import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteReview({ setErrorMsg, setDelReviewMsg }) {
  const { listingId, reviewId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteReview = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/listings/${listingId}/reviews/${reviewId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error);
        }

        setDelReviewMsg("Review deleted!");
        navigate(`/listings/${listingId}`);
      } catch (error) {
        setErrorMsg(error.message);
        navigate(`/listings/${listingId}`);
        return;
      }
    };
    deleteReview();
  }, [listingId, reviewId, navigate, setErrorMsg]);

  return null;
}
export default DeleteReview;
