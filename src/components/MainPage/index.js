import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { BannerSection, MainPageLayout } from "./styles";
import MovieCard from "../MovieCard";
import ReactPaginate from "react-paginate";
import { Container, Image } from "react-bootstrap";
import Banner from "../../assets/images/banner.svg";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const navigate = useNavigate();
  const [moviesListData, setMoviesListData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [searchedMovieName, setSearchedMovieName] = useState();

  const getMoviesData = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
    );

    setMoviesListData(response?.data?.results);
    setTotalPage(response?.data?.total_pages);
  };

  const handlePageClick = (e) => {
    setCurrentPage(e?.selected);
  };

  const getMovieListBySearchValue = async () => {
    let newMovieListBySearch = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchedMovieName}&page=1&include_adult=false`
    );

    setMoviesListData(newMovieListBySearch?.data?.results);
    setTotalPage(newMovieListBySearch?.data?.total_pages);
  };

  useEffect(() => {
    getMoviesData();
  }, [currentPage]);

  useEffect(() => {
    if (searchedMovieName) {
      getMovieListBySearchValue();
    }
    if (searchedMovieName?.length === 0) {
      getMoviesData();
    }
  }, [searchedMovieName]);

  return (
    <>
      <Navbar
        searchedMovieName={searchedMovieName}
        setSearchedMovieName={setSearchedMovieName}
      />

      {!searchedMovieName && (
        <BannerSection>
          <Image src={Banner} alt='' />
        </BannerSection>
      )}

      <Container className='d-flex align-items-center'>
        <MainPageLayout>
          <h3>{searchedMovieName ? "Search Result" : "Trending"}</h3>

          <div className='d-flex flex-wrap justify-content-start'>
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
          </div>
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
