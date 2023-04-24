import styled from "styled-components";

export const NavbarSection = styled.div`
  background: #263f61;
  font-size: 32px;
  color: #fff;
  padding: 12px 43px 10px 43px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 1;

  > div {
    margin: auto 56px;
  }

  @media (max-width: 1199.98px) {
    /* flex-direction: column;
    align-items: start; */
  }
  @media (max-width: 575.98px) {
    padding: 16px 20px;
    flex-direction: column;
    align-items: start;

    .logo {
      margin-bottom: 16px;
    }
  }

  @media (max-width: 767.98px) {
    div {
      margin: 0;
    }
  }
`;

export const CustomInput = styled.div`
  height: 44px;
  display: flex;
  align-items: center;
  margin-right: 50px;

  input {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    height: 100%;
    background: #334b6a;
    color: #fff;
    border: 1px solid #687a91;
    border-radius: 5px 0 0 5px;
    padding: 10px 8px;
    max-width: 424px;
    width: 100%;

    &::placeholder {
      font-family: "Poppins";
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      color: #fff;
    }

    &:focus {
      outline: none;
    }
  }

  @media (max-width: 1199.98px) {
    /* margin-top: 16px; */
  }
  @media (max-width: 767.98px) {
    /* padding: 16px 20px; */
    margin-right: 0px;
  }
`;

export const LogoutBtn = styled.button`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #ffffff;
  background: transparent;
  border: none;

  @media (max-width: 1199.98px) {
    /* display: none; */
  }
  @media (max-width: 767.98px) {
    display: none;
  }
`;