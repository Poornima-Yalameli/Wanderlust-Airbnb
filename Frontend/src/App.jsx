import { useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexRoute from "./pages/listings/IndexRoute";
import ShowRoute from "./pages/listings/ShowRoute";
import NewRoute from "./pages/listings/NewRoute";
import EditRoute from "./pages/listings/EditRoute";
import DeleteRoute from "./pages/listings/DeleteRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorMSg from "./pages/ErrorMsg";
import DeleteReview from "./pages/listings/DeleteReview";
import SignUp from "./pages/users/SignUp";
import LogIn from "./pages/users/LogIn";
import LogOut from "./pages/users/LogOut";

function App() {
  const [successMsg, setSuccessMsg] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [delReviewMsg, setDelReviewMsg] = useState("");
  const [editUpdateMsg, setEditUpdateMsg] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar
          isLoggedIn={isLoggedIn}
          setError={setErrorMsg}
          setIsLoggedIn={setIsLoggedIn}
        />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <IndexRoute
                  successMsg={successMsg}
                  setSuccessMsg={setSuccessMsg}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                />
              }
            />
            <Route
              path="/listings/:id"
              element={
                <ShowRoute
                  isLoggedIn={isLoggedIn}
                  currentUser={currentUser}
                  setErrorMsg={setErrorMsg}
                  errorMsg={errorMsg}
                  delReviewMsg={delReviewMsg} // <-- Add this
                  setDelReviewMsg={setDelReviewMsg} // <-- And this
                  editUpdateMsg={editUpdateMsg} // Add this
                  setEditUpdateMsg={setEditUpdateMsg} // And this
                />
              }
            />
            <Route
              path="/listings/new"
              element={<NewRoute setSuccessMsg={setSuccessMsg} />}
            />
            <Route
              path="/listings/:id/edit"
              element={
                <EditRoute
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setEditUpdateMsg={setEditUpdateMsg}
                />
              }
            />
            <Route
              path="/listings/:id/delete"
              element={
                <DeleteRoute
                  setSuccessMsg={setSuccessMsg}
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                />
              }
            />

            <Route
              path="/listings/:listingId/reviews/:reviewId/delete"
              element={
                <DeleteReview
                  setErrorMsg={setErrorMsg}
                  setDelReviewMsg={setDelReviewMsg}
                />
              }
            />

            <Route
              path="/signup"
              element={
                <SignUp
                  setSuccessMsg={setSuccessMsg}
                  setErrorMsg={setErrorMsg}
                />
              }
            />

            <Route
              path="/login"
              element={
                <LogIn
                  setSuccessMsg={setSuccessMsg}
                  errorMsg={errorMsg}
                  setErrorMsg={setErrorMsg}
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route
              path="/logout"
              element={
                <LogOut
                  setIsLoggedIn={setIsLoggedIn}
                  setSuccessMsg={setSuccessMsg}
                  setErrorMsg={setErrorMsg}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="*" element={<ErrorMSg message="Page Not Found" />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
