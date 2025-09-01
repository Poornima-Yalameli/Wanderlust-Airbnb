import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./ShowRoute.css";
import Review from "./Review";
import ShowReview from "./ShowReview";

function ShowRoute({
  isLoggedIn,
  currentUser,
  errorMsg,
  setErrorMsg,
  delReviewMsg,
  setDelReviewMsg,
  editUpdateMsg,
  setEditUpdateMsg,
}) {
  const { id } = useParams();

  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  const [reviewMsg, setReviewMsg] = useState("");

  const fetchListing = async () => {
    try {
      const res = await fetch(`http://localhost:5000/listings/${id}`, {
        credentials: "include",
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        navigate("/");
        return;
      }

      setListing(data);
      setError("");
    } catch (err) {
      setError("Failed to fetch listing.");
      navigate("/");
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  if (!listing) {
    return <div>Please wait,fetching data.......</div>;
  }

  const handleEditListing = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setErrorMsg("You must logged in to edit a listing! ");
      navigate("/login");
    }
  };
  const handleDeleteListing = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      setErrorMsg("You must logged in to delete a listing! ");
      navigate("/login");
    }
  };

  const handleReviewAdded = async () => {
    setListing(null);
    await fetchListing();
    setReviewMsg("Review created!");
  };

  return (
    <div className="container">
      <div className="row mt-3">
        {errorMsg && (
          <div className="alert alert-danger alert-dismissible fade show col-12 col-md-6 offset-md-3 col-lg-6 mx-auto">
            <strong>{errorMsg}</strong>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setErrorMsg("")}
            ></button>
          </div>
        )}

        {reviewMsg && (
          <div className="container">
            <div
              className="alert alert-success alert-dismissible fade show col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3"
              role="alert"
            >
              <strong>{reviewMsg}</strong>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => setReviewMsg("")}
              ></button>
            </div>
          </div>
        )}

        {delReviewMsg && (
          <div
            className="alert alert-success alert-dismissible fade show col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3"
            role="alert"
          >
            <strong>{delReviewMsg}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setDelReviewMsg("")}
            ></button>
          </div>
        )}

        {editUpdateMsg && (
          <div
            className="alert alert-success alert-dismissible fade show col-12 col-md-6 offset-md-3 col-lg-6 offset-lg-3"
            role="alert"
          >
            <strong>{editUpdateMsg}</strong>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              onClick={() => setEditUpdateMsg("")}
            ></button>
          </div>
        )}

        <div className="col-12 col-md-8 offset-md-3 px-2">
          <h3 className="heading">{listing.title}</h3>
        </div>
        <div className="card col-12 col-md-6 offset-md-3 show-card listing-card px-2">
          <img src={listing.image.url} className="card-img-top show-img" />
          <div className="card-body">
            <p className="card-text">
              <b>Owner: </b>
              <i>{listing.owner.username}</i>
            </p>
            <p className="card-text">{listing.description}</p>
            <p className="card-text">
              &#8377; {listing.price.toLocaleString("en-IN")} /night
            </p>
            <p className="card-text">{listing.country}</p>
            <p className="card-text">{listing.location}</p>
          </div>

          {isLoggedIn &&
            currentUser &&
            listing.owner &&
            listing.owner._id.toString() === currentUser._id.toString() && (
              <div className="row d-flex mt-3 px-2">
                <Link
                  to={`/listings/${listing._id}/edit`}
                  onClick={handleEditListing}
                  className="btn btn-secondary me-2"
                >
                  {" "}
                  Edit
                </Link>
                <Link
                  to={`/listings/${listing._id}/delete`}
                  onClick={handleDeleteListing}
                  className="btn btn-danger"
                >
                  {" "}
                  Delete
                </Link>
              </div>
            )}
        </div>
        <Review
          listingId={listing._id}
          currentUser={currentUser}
          setReviewMsg={setReviewMsg}
          // onReviewAdded={fetchListing}
          onReviewAdded={handleReviewAdded}
        />
        {listing.reviews && (
          <ShowReview reviews={listing.reviews} listingId={listing._id} />
        )}
      </div>
    </div>
  );
}
export default ShowRoute;
