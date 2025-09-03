import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function DeleteRoute({ setSuccessMsg }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteListing = async () => {
      await fetch(`${apiUrl}/listings/${id}`, {
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
