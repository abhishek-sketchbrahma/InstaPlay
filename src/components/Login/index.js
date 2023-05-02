/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Loader from "../../utils/Loader";

import loginApi from "../../services/loginApi";
import { ToastMessage } from "../../utils/toast";
import { SignInContainer, LoginInForm } from "./styles";
import AppLayout from "../../utils/AppLayout";

const Login = () => {
  const navigate = useNavigate();

  const [loginPageState, setLoginPageState] = useState({
    isLoading: false,
    errMsg: null,
    reqToken: null,
  });

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [validationErr, setValidationErr] = useState({
    userNameErr: false,
    passwordErr: false,
  });

  useEffect(() => {
    getReqToken();
  }, []);

  const onSuccess = (e) => {
    setLoginPageState({
      ...loginPageState,
      reqToken: e?.data?.request_token,
    });
  };

  const getReqToken = () => {
    loginApi.fetchToken(onSuccess, {});
  };

  const onSuccessLogin = (e) => {
    localStorage.setItem("Token", e?.data?.request_token);
    ToastMessage("Logged in Successfully", "success");
    navigate("/home");
    setLoginPageState({ ...loginPageState, isLoading: false });
  };

  const onLoginFail = (e) => {
    setLoginPageState({
      ...loginPageState,
      errMsg: e?.response?.data?.status_message,
      isLoading: false,
    });
  };

  const onSubmitLoginForm = () => {
    setLoginPageState({ ...loginPageState, isLoading: true });

    const formData = new FormData();
    formData.append("username", userName);
    formData.append("password", password);
    formData.append("request_token", loginPageState?.reqToken);

    loginApi.onLogin(onSuccessLogin, onLoginFail, formData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userName && password) {
      onSubmitLoginForm();
    } else {
      setValidationErr({
        userNameErr: true,
        passwordErr: true,
      });
    }
  };

  const handleUserNameChange = (e) => {
    setUserName(e?.target?.value);
    setValidationErr({
      ...validationErr,
      userNameErr: false,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e?.target?.value);
    setValidationErr({
      ...validationErr,
      passwordErr: false,
    });
  };

  const onPasswordBlur = () => {
    password === ""
      ? setValidationErr({
          ...validationErr,
          passwordErr: true,
        })
      : setValidationErr({
          ...validationErr,
          passwordErr: false,
        });
  };

  const onUserNameBlur = () => {
    userName === ""
      ? setValidationErr({
          ...validationErr,
          userNameErr: true,
        })
      : setValidationErr({
          ...validationErr,
          userNameErr: false,
        });
  };

  return (
    <>
      <AppLayout>
        <LoginInForm className='log'>
          <SignInContainer>
            <h4>Sign in</h4>
            <p>Sign in to your Self Service Portal</p>

            <form onSubmit={handleSubmit}>
              <div className='inputFeild position-relative'>
                <input
                  id='username'
                  type='text'
                  placeholder='Username'
                  value={userName}
                  onChange={handleUserNameChange}
                  onBlur={onUserNameBlur}
                />
                {validationErr?.userNameErr ? (
                  <div className='errorMessage position-absolute err'>
                    Please enter username
                  </div>
                ) : null}
              </div>
              <div className='inputFeild position-relative'>
                <input
                  id='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={onPasswordBlur}
                />
                {validationErr.passwordErr ? (
                  <div className='errorMessage position-absolute err'>
                    Please enter password
                  </div>
                ) : null}
                {
                  <div className='errorMessage position-absolute err apiErrMessage'>
                    {loginPageState?.errMsg}
                  </div>
                }
              </div>
              <button type='submit'>
                {loginPageState?.isLoading ? <Loader /> : "Log In"}
              </button>
            </form>
          </SignInContainer>
        </LoginInForm>
      </AppLayout>
    </>
  );
};

export default Login;
