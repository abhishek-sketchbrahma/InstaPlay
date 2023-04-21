import React from "react";
import { Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { ToastMessage } from "../../common/toast";
import { CustomInput, LogoutBtn, NavbarSection } from "./styles";
import SearchIcon from "../../assets/images/searchIcon.svg";

const Navbar = ({ searchedMovieName, setSearchedMovieName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem("Token");
    ToastMessage("Logged out Successfully", "success");
    navigate("/");
  };

  return (
    <NavbarSection>
      <div>
        <Image src={Logo} alt='' />
      </div>

      {location?.pathname?.includes("home") && (
        <div className='d-flex'>
          <CustomInput>
            <input
              placeholder='Search movies'
              value={searchedMovieName}
              onChange={(e) => setSearchedMovieName(e?.target?.value)}
            />
            <Image src={SearchIcon} alt='' />
          </CustomInput>
          <LogoutBtn onClick={onLogout}>Logout</LogoutBtn>
        </div>
      )}
    </NavbarSection>
  );
};

export default Navbar;
