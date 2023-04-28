/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Loader from "../Loader";
import { ToastMessage } from "../../common/toast";
import { SignInContainer, LoginInForm } from "./styles";

const Login = () => {
  const navigate = useNavigate();

  const [loginPageState, setLoginPageState] = useState({
    isLoading: false,
    errMsg: null,
    reqToken: null,
  });

  const getReqToken = async () => {
    try {
      let reqTokenData = await axios.get(
        "https://api.themoviedb.org/3/authentication/token/new?api_key=abac24cb3472244be1ad075dde55f834"
      );
      reqTokenData?.data?.request_token &&
        setLoginPageState({
          ...loginPageState,
          reqToken: reqTokenData?.data?.request_token,
        });
    } catch (err) {
      console.log();
    }
  };

  useEffect(() => {
    getReqToken();
  }, []);

  const onSubmitLoginForm = async (data) => {
    setLoginPageState({ ...loginPageState, isLoading: true });

    const formData = new FormData();
    formData.append("username", data?.username);
    formData.append("password", data.password);
    formData.append("request_token", loginPageState?.reqToken);

    try {
      let res = await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`,
        formData
      );

      if (res?.data?.success) {
        localStorage.setItem("Token", res?.data?.request_token);
        ToastMessage("Logged in Successfully", "success");
        navigate("/home");
      }
      setLoginPageState({ ...loginPageState, isLoading: false });
    } catch (err) {
      if (!err?.response?.data?.success) {
        setLoginPageState({
          ...loginPageState,
          errMsg: err?.response?.data?.status_message,
        });
      }

      setLoginPageState({ ...loginPageState, isLoading: false });
    }
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string().required("Please enter username"),
      password: Yup.string().required("Please enter password"),
    }),

    onSubmit: onSubmitLoginForm,
  });

  return (
    <>
      <Navbar />
      <LoginInForm className='log'>
        <SignInContainer>
          <h4>Sign in</h4>
          <p>Sign in to your Self Service Portal</p>

          <form onSubmit={formik.handleSubmit}>
            <div className='inputFeild position-relative'>
              <input
                id='username'
                type='text'
                placeholder='Username'
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='errorMessage position-absolute err'>
                  {formik.errors.username}
                </div>
              ) : null}
            </div>
            <div className='inputFeild position-relative'>
              <input
                id='password'
                type='password'
                placeholder='Password'
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='errorMessage position-absolute err'>
                  {formik.errors.password}
                </div>
              ) : null}
              {
                <div className='errorMessage position-absolute err apiErrMessage'>
                  {loginPageState?.errMsg}
                </div>
              }
            </div>
            <button type='submit' disabled={loginPageState?.isLoading}>
              {loginPageState?.isLoading ? <Loader /> : "Log In"}
            </button>
          </form>
        </SignInContainer>
      </LoginInForm>
    </>
  );
};

export default Login;
