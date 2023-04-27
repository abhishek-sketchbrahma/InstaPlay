/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { BannerSection, MovieSection } from "./styles";
import MovieCard from "../MovieCard";
import { Col, Image } from "react-bootstrap";
import Banner from "../../assets/images/banner.svg";
import { useLocation, useNavigate } from "react-router-dom";

import ReactPaginate from "react-paginate";

const MainPage = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [moviesListData, setMoviesListData] = useState(null);
  const [showBanner, setShowBanner] = useState(true);

  const [searchedMovieName, setSearchedMovieName] = useState(null);

  const getMoviesData = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${
          process.env.REACT_APP_API_KEY
        }&page=${currentPage + 1}`
      )
      .then((response) => {
        setMoviesListData(response?.data?.results);
        setTotalPage(response?.data?.total_pages);
      })
      .finally(() => {
        setIsLoading(false);
        setShowBanner(true);
      });
  };

  const getMovieListBySearchValue = async () => {
    setIsLoading(true);
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
        setShowBanner(false);
      });
  };

  useEffect(() => {
    if (!searchedMovieName) {
      getMoviesData();
    }
  }, [searchedMovieName, currentPage]);

  useEffect(() => {
    let timer;
    if (searchedMovieName) {
      timer = setTimeout(() => {
        getMovieListBySearchValue();

        setShowBanner(true);
      }, 300);
    }
    return () => {
      clearTimeout(timer);
      setMoviesListData(null);
    };
  }, [searchedMovieName, currentPage]);

  useEffect(() => {
    setTimeout(() => {
      if (location?.state?.currentPage) {
        setCurrentPage(location?.state?.currentPage);
      }
      if (location?.state?.searchedMovieName) {
        setSearchedMovieName(location?.state?.searchedMovieName);
      }
    }, [500]);
    return () => {
      setMoviesListData(null);
    };
  }, [location?.state?.currentPage, location?.state?.searchedMovieName]);

  useEffect(() => {
    navigate("/home", {});
    setCurrentPage(0);
    return () => setMoviesListData(null);
  }, []);

  return (
    <div>
      <Navbar
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={(e) => {
          setSearchedMovieName(e);
          setCurrentPage(0);
        }}
      />
      <BannerSection>
        <Image src={Banner} alt='' />
      </BannerSection>

      {isLoading ? (
        <div>
          <h1 style={{ color: "white" }}>Loading...</h1>
        </div>
      ) : (
        <div className='mainPageContentWrapper'>
          <div>
            {showBanner ? (
              <h3 className='mainPageTitle'>Trending</h3>
            ) : (
              <h3 className='mainPageTitle search'>Search result</h3>
            )}

            <MovieSection>
              {moviesListData?.length ? (
                moviesListData?.map((item, index) => {
                  return (
                    <Col
                      xxl={3}
                      xl={3}
                      lg={4}
                      md={4}
                      sm={6}
                      xs={12}
                      className='overflow-hidden'
                      key={index}
                    >
                      <MovieCard
                        data={item}
                        onClick={() =>
                          item?.id &&
                          navigate(`/details/${item?.id}`, {
                            state: { currentPage, searchedMovieName },
                          })
                        }
                        index={index}
                        key={index}
                      />
                    </Col>
                  );
                })
              ) : (
                <div className='mainPageLoader'>
                  <h1>No data found</h1>
                </div>
              )}
            </MovieSection>
          </div>
        </div>
      )}
      <ReactPaginate
        previousLabel='<'
        nextLabel='>'
        breakLabel={<span style={{ color: "white", padding: "4px" }}>...</span>}
        pageCount={totalPage}
        onPageChange={(e) => setCurrentPage(e?.selected)}
        pageRangeDisplayed={5}
        containerClassName='pagination customPagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        forcePage={currentPage}
      />
    </div>
  );
};

export default MainPage;
