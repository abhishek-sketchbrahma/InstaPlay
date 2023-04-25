import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { BannerSection, MainPageLayout, MovieSection } from "./styles";
import MovieCard from "../MovieCard";
import ReactPaginate from "react-paginate";
import { Container, Image } from "react-bootstrap";
import Banner from "../../assets/images/banner.svg";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [moviesListData, setMoviesListData] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(null);
  const [searchedMovieName, setSearchedMovieName] = useState(null);
  const [flag, setFlag] = useState(0);

  const handlePageClick = (e) => {
    setCurrentPage(e?.selected);
    console.log(e?.selected, "aaaaaaaa");
  };

  const getMoviesData = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${
        process.env.REACT_APP_API_KEY
      }&page=${currentPage + 1}`
    );

    setMoviesListData(response?.data?.results);
    setTotalPage(response?.data?.total_pages);
  };

  const getMovieListBySearchValue = async () => {
    let newMovieListBySearch = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.REACT_APP_API_KEY
      }&language=en-US&query=${searchedMovieName}&page=${
        currentPage + 1
      }&include_adult=false`
    );

    setMoviesListData(newMovieListBySearch?.data?.results);
    setTotalPage(newMovieListBySearch?.data?.total_pages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  };

  useEffect(() => {
    if (!searchedMovieName) {
      getMoviesData();
    } else {
      getMovieListBySearchValue();
    }
  }, [currentPage]);

  useEffect(() => {
    let timeOut = setTimeout(() => {
      if (searchedMovieName && flag === 1) {
        getMovieListBySearchValue();
      }
      if (searchedMovieName?.length === 0 && flag === 0) {
        setFlag(0);
        getMoviesData();
      }
    }, 2000);

    return () => {
      clearTimeout(timeOut);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchedMovieName]);

  return (
    <>
      <Navbar
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={setSearchedMovieName}
        setCurrentPage={setCurrentPage}
        setFlag={setFlag}
      />

      {!searchedMovieName && (
        <BannerSection>
          <Image src={Banner} alt='' />
        </BannerSection>
      )}

      <Container>
        <MainPageLayout>
          <h3>{searchedMovieName ? <span>Search Result</span> : "Trending"}</h3>
          <MovieSection>
            {moviesListData?.length ? (
              moviesListData?.map((item) => {
                return (
                  <div
                    key={item?.id}
                    onClick={() => item?.id && navigate(`/details/${item?.id}`)}
                  >
                    <MovieCard data={item} />
                  </div>
                );
              })
            ) : (
              <h3>No data found</h3>
            )}
          </MovieSection>
        </MainPageLayout>
      </Container>

      <ReactPaginate
        previousLabel='<'
        nextLabel='>'
        breakLabel='...'
        pageCount={Number(totalPage)}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        containerClassName='pagination customPagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
      />
    </>
  );
};

export default MainPage;
