import React from "react";
import { Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";
import { CustomInput, LogoutBtn, NavbarSection } from "./styles";
import SearchIcon from "../../assets/images/searchIcon.svg";

const Navbar = ({ searchedMovieName, setSearchedMovieName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem("Token");
    navigate("/");
  };

  return (
    <NavbarSection>
      <Image
        src={Logo}
        alt='Logo'
        className='logo'
        onClick={() => navigate("/home")}
      />

      {location?.pathname?.includes("home") && (
        <div className='d-flex m-0'>
          <CustomInput>
            <input
              placeholder='Search movies'
              value={searchedMovieName ?? ""}
              onChange={(e) => {
                setSearchedMovieName(e?.target?.value);
              }}
            />
            <Image src={SearchIcon} alt='SearchIcon' />
          </CustomInput>
          <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
        </div>
      )}
    </NavbarSection>
  );
};

export default Navbar;
