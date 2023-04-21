import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import "./App.scss";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainPage from "./components/MainPage";
import AuthGuard from "./common/AuthGuard";
import DetailPage from "./components/DetailPage";

const App = () => {
  const getReqToken = async () => {
    let reqTokenData = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=abac24cb3472244be1ad075dde55f834"
    );
    reqTokenData?.data?.request_token &&
      localStorage.setItem("getReqToken", reqTokenData?.data?.request_token);
  };

  useEffect(() => {
    getReqToken();
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route
            exact
            path='/home'
            element={
              <AuthGuard>
                <MainPage />
              </AuthGuard>
            }
          />

          <Route
            exact
            path='/details/:id'
            element={
              <AuthGuard>
                <DetailPage />
              </AuthGuard>
            }
          />
          <Route exact path={"*"} element={<Login />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
export default App;
