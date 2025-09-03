import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { formValidation } from "../../js/Script";

function EditRoute({ currentUser, setEditUpdateMsg }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");

  const [newImage, setNewImage] = useState(null);

  useEffect(() => {
    if (listing) {
      formValidation();
    }
  }, [listing]);

  useEffect(() => {
    const fetchListing = async () => {
      const res = await fetch(`/listings/${id}/edit`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error);
        return;
      }

      setListing(data);
      setTitle(data.title);
      setDescription(data.description);
      setPrice(data.price);
      setCountry(data.country);
      setLocation(data.location);
    };
    fetchListing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("listing[title]", title);
    formData.append("listing[description]", description);
    formData.append("listing[price]", price);
    formData.append("listing[country]", country);
    formData.append("listing[location]", location);

    if (newImage) {
      formData.append("image", newImage);
    }

    const res = await fetch(`/listings/${id}`, {
      method: "PUT",

      credentials: "include",
      body: formData,
    });

    if (!res.ok) {
      // Handle errors if needed
      return;
    }

    const updatedListing = await res.json();
    setListing(updatedListing);

    setEditUpdateMsg("Listing updated!");
    navigate(`/listings/${id}`);
  };

  if (!listing) {
    return <div>Loading........</div>;
  }

  if (
    listing &&
    listing.owner &&
    currentUser &&
    listing.owner._id !== currentUser._id
  ) {
    return (
      <div
        className="alert alert-danger alert-dismissible fade show col-12 col-md-6 offset-md-3"
        role="alert"
      >
        <strong> You don't have permission to edit this listing.</strong>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    );
  }

  return (
    <div className="container pb-3">
      <div className="row mt-3">
        <div className="col-12 col-md-8 offset-md-2">
          <form
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate
            encType="multipart/form-data"
          >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={title}
                className="form-control"
                placeholder="Add a catchy title"
                required
                onChange={(e) => setTitle(e.target.value)}
              />
              <div className="valid-feedback">Title looks Good!</div>
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
              <div className="invalid-feedback">
                Please enter a short description
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Current Image
              </label>
              <br></br>
              {listing.image?.url && (
                <img
                  src={listing.image.url}
                  alt="Current"
                  style={{
                    width: "200px",
                    height: "200px",
                    marginBottom: "10px",
                  }}
                />
              )}
              <input
                type="file"
                accept="image/*"
                className="form-control"
                onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={price}
                className="form-control"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
              <div className="invalid-feedback">Price should be valid</div>
            </div>
            <div className="mb-3">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                value={country}
                name="country"
                className="form-control"
                placeholder="India"
                required
                onChange={(e) => setCountry(e.target.value)}
              />
              <div className="invalid-feedback">
                Country name should be valid
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                value={location}
                name="location"
                className="form-control"
                placeholder="Jaipur, Rajastan"
                onChange={(e) => setLocation(e.target.value)}
                required
              />
              <div className="invalid-feedback">Location should be valid</div>
            </div>
            <button type="submit" className="btn btn-success text-uppercase">
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default EditRoute;
