import "./App.scss";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login";
import AuthGuard from "./common/AuthGuard";
import MainPage from "./components/MainPage";
import { ToastContainer } from "react-toastify";
import DetailPage from "./components/DetailPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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
