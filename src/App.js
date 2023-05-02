import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthGuard from "./utils/AuthGuard";
import Loader from "./utils/Loader";

import { ToastContainer } from "react-toastify";

import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

const Login = lazy(() => import("./components/Login"));
const MovieList = lazy(() => import("./components/MovieList"));
const MovieDetail = lazy(() => import("./components/MovieDetail"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Suspense fallback={<Loader />}>
                <Login />
              </Suspense>
            }
          />
          <Route
            exact
            path='/home'
            element={
              <AuthGuard>
                <Suspense fallback={<Loader />}>
                  <MovieList />
                </Suspense>
              </AuthGuard>
            }
          />

          <Route
            exact
            path='/details/:id'
            element={
              <AuthGuard>
                <Suspense fallback={<Loader />}>
                  <MovieDetail />
                </Suspense>
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
