import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./IndexRoute.css";

function IndexRoute({ successMsg, setSuccessMsg, errorMsg, setErrorMsg }) {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    const fetchAllListings = async () => {
      const res = await fetch(`/listings`);
      const data = await res.json();
      setAllListings(data);
    };
    fetchAllListings();
  }, []);

  return (
    <div className="container px-lg-5 px-md-3 px-sm-2">
      {successMsg && (
        <div
          className="alert alert-success alert-dismissible fade show col-12 col-md-6 offset-md-3"
          role="alert"
        >
          <strong>{successMsg}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setSuccessMsg("")}
          ></button>
        </div>
      )}
      {errorMsg && (
        <div
          className="alert alert-danger alert-dismissible fade show col-12 col-md-6 offset-md-3"
          role="alert"
        >
          <strong>{errorMsg}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
            onClick={() => setErrorMsg("")}
          ></button>
        </div>
      )}
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
        {allListings.map((listing) => (
          <div className="card col listing-card" key={listing._id}>
            <Link to={`/listings/${listing._id}`}>
              <img
                src={listing.image.url}
                className="card-img-top"
                alt="listing image"
                style={{ height: "20rem" }}
              />{" "}
            </Link>
            <div className="card-body">
              <p className="card-text">
                <b>{listing.title}</b>
                <br />
                &#8377; {listing.price.toLocaleString("en-IN")} /night
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default IndexRoute;
