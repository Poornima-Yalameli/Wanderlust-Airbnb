import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeleteRoute({ setSuccessMsg }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteListing = async () => {
      await fetch(`/listings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      setSuccessMsg("Listing deleted!");
      navigate("/");
    };

    deleteListing();
  }, [id]);

  return <div>Delete Listing........</div>;
}

export default DeleteRoute;
