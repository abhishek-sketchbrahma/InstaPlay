import React from "react";
import Navbar from "../../components/Navbar";

const AppLayout = ({ children, searchedMovieName, setSearchedMovieName }) => {
  return (
    <>
      <Navbar
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={setSearchedMovieName}
      />
      <>{children}</>
    </>
  );
};

export default AppLayout;
