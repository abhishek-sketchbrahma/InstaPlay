/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import MovieCard from "../MovieCard";
import Banner from "../../assets/images/banner.svg";
import { BannerSection, MovieSection } from "./styles";

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [mainPageState, setMainPageState] = useState({
    isLoading: false,
    currentPage: 0,
    totalPage: null,
    showBanner: true,
  });

  const [moviesListData, setMoviesListData] = useState(null);
  const [searchedMovieName, setSearchedMovieName] = useState(null);

  const getMoviesData = async () => {
    setMainPageState({ ...mainPageState, isLoading: true });
    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${
          process.env.REACT_APP_API_KEY
        }&page=${mainPageState?.currentPage + 1}`
      );

      setMoviesListData(response?.data?.results);
      setMainPageState({
        ...mainPageState,
        isLoading: false,
        totalPage: response?.data?.total_pages,
        showBanner: true,
      });
    } catch (err) {
      setMainPageState({
        ...mainPageState,
        isLoading: false,
        showBanner: true,
      });
    }
  };

  const getMovieListBySearchValue = async () => {
    setMainPageState({ ...mainPageState, isLoading: true });

    try {
      let response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          process.env.REACT_APP_API_KEY
        }&language=en-US&query=${searchedMovieName}&page=${
          mainPageState?.currentPage + 1
        }&include_adult=false`
      );

      setMoviesListData(response?.data?.results);
      setMainPageState({
        ...mainPageState,
        isLoading: false,
        totalPage: response?.data?.total_pages,
        showBanner: false,
      });
    } catch (err) {
      setMainPageState({
        ...mainPageState,
        isLoading: false,
        showBanner: false,
      });
    }
  };

  useEffect(() => {
    if (!searchedMovieName) {
      getMoviesData();
    }
  }, [searchedMovieName, mainPageState?.currentPage]);

  useEffect(() => {
    let timer;
    if (searchedMovieName) {
      timer = setTimeout(() => {
        getMovieListBySearchValue();

        setMainPageState({ ...mainPageState, showBanner: true });
      }, 300);
    }
    return () => {
      clearTimeout(timer);
      setMoviesListData(null);
    };
  }, [searchedMovieName, mainPageState?.currentPage]);

  useEffect(() => {
    setTimeout(() => {
      if (location?.state?.currentPage) {
        setMainPageState({
          ...mainPageState,
          currentPage: location?.state?.currentPage,
        });
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
    setMainPageState({
      ...mainPageState,
      currentPage: 0,
    });

    return () => setMoviesListData(null);
  }, []);

  return (
    <div>
      <Navbar
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={(e) => {
          setSearchedMovieName(e);
          setMainPageState({
            ...mainPageState,
            currentPage: 0,
          });
        }}
      />
      <BannerSection>
        <Image src={Banner} alt='' />
      </BannerSection>

      {mainPageState?.isLoading ? (
        <div className='d-flex align-items-center justify-content-center'>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div className='mainPageContentWrapper'>
          <div>
            {mainPageState?.showBanner ? (
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
                            state: {
                              currentPage: mainPageState?.currentPage,
                              searchedMovieName,
                            },
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
        breakLabel={<span className='paginationBreak'>...</span>}
        pageCount={mainPageState?.totalPage}
        onPageChange={(e) =>
          setMainPageState({
            ...mainPageState,
            currentPage: e?.selected,
          })
        }
        pageRangeDisplayed={5}
        containerClassName='pagination customPagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        forcePage={mainPageState?.currentPage}
      />
    </div>
  );
};

export default MainPage;
