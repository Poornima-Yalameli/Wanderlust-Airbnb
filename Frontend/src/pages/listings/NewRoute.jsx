import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./NewRoute.css";
import { formValidation } from "../../js/Script";
const apiUrl = import.meta.env.VITE_API_URL;

function NewRoute({ setSuccessMsg }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    formValidation();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("listing[title]", title);
    formData.append("listing[description]", description);
    formData.append("listing[price]", price);
    formData.append("listing[country]", country);
    formData.append("listing[location]", location);
    formData.append("image", image);

    const res = await fetch(`${apiUrl}/listings`, {
      method: "POST",

      credentials: "include",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      // alert(data.message);
      setError(data.error);
      return;
    }

    setTitle("");
    setDescription("");
    setPrice("");
    setCountry("");
    setLocation("");
    setImage(null);

    setSuccessMsg("New listing was created!");
    setError("");

    navigate("/");
  };
  return (
    <div className="container pb-3">
      <div className="row mt-3">
        <div className="col-12 col-md-8 offset-md-2">
          {error ? (
            <div className="alert alert-danger col-6 offset-3">{error}</div>
          ) : (
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
                  className="form-control"
                  placeholder="Add a catchy title"
                  required
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <div className="valid-feedback">Title looks Good!</div>
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <textarea
                  className="form-control"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <div className="invalid-feedback">
                  Please enter a short description
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="image" className="form-label">
                  Upload Listing Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              <div className="row">
                <div className="mb-3 col-md-4">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    // type="number"
                    className="form-control"
                    required
                    value={price}
                    placeholder="1200"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <div className="invalid-feedback">Price should be valid</div>
                </div>

                <div className="mb-3 col-md-8">
                  <label htmlFor="country" className="form-label">
                    Country
                  </label>
                  <input
                    className="form-control"
                    placeholder="India"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <div className="invalid-feedback">
                    Country name should be valid
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  className="form-control"
                  placeholder="Jaipur, Rajastan"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <div className="invalid-feedback">Location should be valid</div>
              </div>

              <button type="submit" className="btn btn-success text-uppercase">
                Add
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
export default NewRoute;
