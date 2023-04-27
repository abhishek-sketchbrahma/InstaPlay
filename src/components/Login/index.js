import axios from "axios";
import * as Yup from "yup";
import { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Loader from "../Loader";
import { ToastMessage } from "../../common/toast";
import { SignInContainer, LoginInForm } from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);
  const [reqToken, setReqToken] = useState(null);

  const getReqToken = useCallback(async () => {
    let reqTokenData = await axios.get(
      "https://api.themoviedb.org/3/authentication/token/new?api_key=abac24cb3472244be1ad075dde55f834"
    );
    reqTokenData?.data?.request_token &&
      setReqToken(reqTokenData?.data?.request_token);
  }, []);

  useEffect(() => {
    getReqToken();
  });

  const onSubmitLoginForm = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", data?.username);
    formData.append("password", data.password);
    formData.append("request_token", reqToken);

    axios
      .post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`,
        formData
      )
      .then((res) => {
        if (res?.data?.success) {
          localStorage.setItem("Token", res?.data?.request_token);
          ToastMessage("Logged in Successfully", "success");
          navigate("/home");
        }
      })
      .catch((err) => {
        if (!err?.response?.data?.success) {
          setErrMsg(err?.response?.data?.status_message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
                  {errMsg}
                </div>
              }
            </div>
            <button type='submit' disabled={isLoading}>
              {isLoading ? <Loader /> : "Log In"}
            </button>
          </form>
        </SignInContainer>
      </LoginInForm>
    </>
  );
};

export default Login;
