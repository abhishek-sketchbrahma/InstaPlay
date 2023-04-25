import React from "react";
import { Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import { ToastMessage } from "../../common/toast";
import { CustomInput, LogoutBtn, NavbarSection } from "./styles";
import SearchIcon from "../../assets/images/searchIcon.svg";

const Navbar = ({
  searchedMovieName,
  setSearchedMovieName,
  setCurrentPage,
  setFlag,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const onLogout = () => {
    localStorage.removeItem("Token");
    ToastMessage("Logged out Successfully", "success");
    navigate("/");
  };

  return (
    <NavbarSection>
      <Image
        src={Logo}
        alt=''
        className='logo'
        onClick={() => navigate("/home")}
      />

      {location?.pathname?.includes("home") && (
        <div className='d-flex m-0'>
          <CustomInput>
            <input
              placeholder='Search movies'
              value={searchedMovieName}
              onChange={(e) => {
                setSearchedMovieName(e?.target?.value);
                setCurrentPage(1);
                setFlag(1);
              }}
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
