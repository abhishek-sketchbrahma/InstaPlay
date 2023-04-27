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
import { useCallback } from "react";

const App = () => {
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
