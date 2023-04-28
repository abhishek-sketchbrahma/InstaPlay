import styled from "styled-components";

export const SignInContainer = styled.div`
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 0px 0px rgba(63, 63, 68, 0.05);
  border-radius: 16px;
  max-width: 552px;
  width: 100%;
  padding: 45px 32px;

  .err {
    bottom: -30px;
  }
  .apiErrMessage {
    font-size: small;
  }

  h4 {
    font-family: "Helvetica Neue";
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 36px;
    letter-spacing: 0.24px;
    color: #263238;
    margin-bottom: 10px;
  }

  p {
    font-family: "Helvetica Neue";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #546e7a;
    margin-bottom: 27px;
  }

  input {
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0px 0px 0px rgb(63 63 68 / 5%);
    border-radius: 16px;
    padding: 22px 16px;
    width: 100%;

    &:focus-visible {
      outline: 2px solid #ff7d65 !important;
    }
  }
  .inputFeild {
    margin-bottom: 38px;
  }

  button {
    width: 100%;
    background: #ff7d65;
    box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.31);
    border-radius: 16px;
    border: 1px solid #ff7d65;
    padding: 7px auto;
    font-family: "Helvetica";
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    text-align: center;
    text-transform: uppercase;
    color: #ffffff;
    height: 42px;
  }
  .errorMessage {
    color: red;
  }
`;

export const LoginInForm = styled.div`
  display: flex;
  justify-content: center;
  margin: 98px 20px;

  @media (max-width: 768px) {
    margin: 78px 20px;
  }

  @media (max-width: 576px) {
    margin: 60px 20px;
  }
`;
