/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Col, Image } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

import ReactPaginate from "react-paginate";

import MovieCard from "../MovieCard";
import Loader from "../../utils/Loader";

import AppLayout from "../../utils/AppLayout";
import Banner from "../../assets/images/banner.svg";
import { BannerSection, MovieSection } from "./styles";

import moviesApi from "../../services/moviesApi";

const MovieList = () => {
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

  const onSuccessMovieListFetch = (response) => {
    setMoviesListData(response?.data?.results);
    setMainPageState({
      ...mainPageState,
      isLoading: false,
      totalPage: response?.data?.total_pages,
      showBanner: true,
    });
  };

  const onSuccessMovieSearch = (response) => {
    setMoviesListData(response?.data?.results);
    setMainPageState({
      ...mainPageState,
      isLoading: false,
      totalPage: response?.data?.total_pages,
      showBanner: false,
    });
  };

  const onFailMovieListFetch = () => {
    setMainPageState({
      ...mainPageState,
      isLoading: false,
      showBanner: true,
    });
  };

  const onFailMovieSearch = () => {
    setMainPageState({
      ...mainPageState,
      isLoading: false,
      showBanner: false,
    });
  };

  const getMoviesData = async () => {
    setMainPageState({ ...mainPageState, isLoading: true });

    moviesApi.getMoviesList(
      onSuccessMovieListFetch,
      onFailMovieListFetch,
      mainPageState?.currentPage + 1
    );
  };

  const getMovieListBySearchValue = async () => {
    setMainPageState({ ...mainPageState, isLoading: true });

    moviesApi.searchMovie(
      searchedMovieName,
      mainPageState.currentPage + 1,
      onSuccessMovieSearch,
      onFailMovieSearch
    );
  };

  const onMovieCardClick = (item) =>
    item?.id &&
    navigate(`/details/${item?.id}`, {
      state: {
        currentPage: mainPageState?.currentPage,
        searchedMovieName,
      },
    });

  return (
    <>
      <AppLayout
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={(e) => {
          setSearchedMovieName(e);
          setMainPageState({
            ...mainPageState,
            currentPage: 0,
          });
        }}
      >
        <>
          <BannerSection>
            <Image src={Banner} alt='Banner' />
          </BannerSection>

          {mainPageState?.isLoading ? (
            <div className='d-flex align-items-center justify-content-center'>
              <Loader />
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
                            onClick={() => onMovieCardClick(item)}
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
        </>
      </AppLayout>
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
    </>
  );
};

export default MovieList;
