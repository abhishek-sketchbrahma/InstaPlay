import axios from "axios";
import * as Yup from "yup";
import { useState } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import Loader from "../Loader";
import { ToastMessage } from "../../common/toast";
import { SignInContainer, LoginInForm } from "./styles";

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitLoginForm = async (data) => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append("username", data?.username);
    formData.append("password", data.password);
    formData.append("request_token", localStorage.getItem("getReqToken"));

    axios
      .post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${process.env.REACT_APP_API_KEY}`,
        formData
      )
      .then((res) => {
        if (res?.data?.success) {
          localStorage.setItem("Token", res?.data?.request_token);
          ToastMessage("Log in Successfully", "success");
          navigate("/home");
        }
      })
      .catch((err) => {
        if (!err?.response?.data?.success) {
          ToastMessage("Invaild details");
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
            <div className='inputFeild'>
              <input
                id='username'
                type='text'
                placeholder='User name'
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <div className='errorMessage'>{formik.errors.username}</div>
              ) : null}
            </div>
            <div className='inputFeild'>
              <input
                id='password'
                type='password'
                placeholder='Password'
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className='errorMessage'>{formik.errors.password}</div>
              ) : null}
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
