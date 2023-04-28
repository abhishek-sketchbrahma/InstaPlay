import { lazy, Suspense } from "react";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.scss";
import AuthGuard from "./common/AuthGuard";
import { ToastContainer } from "react-toastify";

const Login = lazy(() => import("./components/Login"));
const MainPage = lazy(() => import("./components/MainPage"));
const DetailPage = lazy(() => import("./components/DetailPage"));

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path='/'
            element={
              <Suspense
                fallback={
                  <div>
                    <h1>Loading...</h1>
                  </div>
                }
              >
                <Login />
              </Suspense>
            }
          />
          <Route
            exact
            path='/home'
            element={
              <AuthGuard>
                <Suspense
                  fallback={
                    <div>
                      <h1>Loading...</h1>
                    </div>
                  }
                >
                  <MainPage />
                </Suspense>
              </AuthGuard>
            }
          />

          <Route
            exact
            path='/details/:id'
            element={
              <AuthGuard>
                <Suspense
                  fallback={
                    <div>
                      <h1>Loading...</h1>
                    </div>
                  }
                >
                  <DetailPage />
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
