/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { BannerSection, MainPageLayout, MovieSection } from "./styles";
import MovieCard from "../MovieCard";
import { Col, Image, Row } from "react-bootstrap";
import Banner from "../../assets/images/banner.svg";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../Loader";

import Paginate from "../../common/Paginate";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [moviesListData, setMoviesListData] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  const [searchedMovieName, setSearchedMovieName] = useState(null);

  const getMoviesData = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
      )
      .then((response) => {
        // setCurrentPage(1);
        setMoviesListData(response?.data?.results);
        setTotalPage(response?.data?.total_pages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const getMovieListBySearchValue = async () => {
    setIsLoading(true);
    setShowBanner(false);
    await axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchedMovieName}&page=${
          currentPage + 1
        }&include_adult=false`
      )
      .then((response) => {
        setMoviesListData(response?.data?.results);
        setTotalPage(response?.data?.total_pages);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (!searchedMovieName) {
      getMoviesData();
    }
  }, [currentPage]);

  useEffect(() => {
    let timer;
    if (searchedMovieName) {
      timer = setTimeout(() => {
        getMovieListBySearchValue();

        setShowBanner(true);
      }, 300);
    } else {
      getMoviesData();
      setCurrentPage(1);
    }
    return () => clearTimeout(timer);
  }, [searchedMovieName, currentPage]);

  useState(() => {
    if (location?.state?.currentPage) {
      setCurrentPage(location?.state?.currentPage);
    }
    if (location?.state?.searchedMovieName) {
      setSearchedMovieName(location?.state?.searchedMovieName);
    }
  }, [location?.state?.currentPage, location?.state?.searchedMovieName]);

  return (
    <div>
      <Navbar
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={setSearchedMovieName}
        // setCurrentPage={setCurrentPage}
        // setFlag={setFlag}
      />

      {isLoading ? (
        <div className='mainPageLoader'>
          <Loader />
        </div>
      ) : (
        <>
          {showBanner ? (
            <BannerSection>
              <Image src={Banner} alt='' />
            </BannerSection>
          ) : null}
          <h4>Trending</h4>
          <MovieSection>
            {moviesListData?.length ? (
              moviesListData?.map((item) => {
                return (
                  <Col md={3}>
                    <div
                      key={item?.id}
                      onClick={() =>
                        item?.id &&
                        navigate(`/details/${item?.id}`, {
                          state: { currentPage, searchedMovieName },
                        })
                      }
                    >
                      <MovieCard data={item} />
                    </div>
                  </Col>
                );
              })
            ) : (
              <h3>No data found</h3>
            )}
          </MovieSection>
          <div className='d-flex align-items-center justify-content-center'>
            <Paginate
              onClick={(e) => setCurrentPage(Number(e.target.innerHTML))}
              pageCount={totalPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              previousBtn={"<"}
              nextBtn={">"}
              classNamePaginationBtnArea={"paginationBtnArea"}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
