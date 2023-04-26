import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { BannerSection, MainPageLayout, MovieSection } from "./styles";
import MovieCard from "../MovieCard";
import { Col, Image, Row } from "react-bootstrap";
import Banner from "../../assets/images/banner.svg";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

import Paginate from "../../common/Paginate";

const MainPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(null);
  const [moviesListData, setMoviesListData] = useState(null);

  const getMoviesData = async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`
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
    getMoviesData();
  }, [currentPage]);

  return (
    <div>
      <Navbar
      // searchedMovieName={searchedMovieName}
      // setSearchedMovieName={setSearchedMovieName}
      // setCurrentPage={setCurrentPage}
      // setFlag={setFlag}
      />

      {isLoading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <MovieSection>
          {moviesListData?.length ? (
            moviesListData?.map((item) => {
              return (
                <Col md={3}>
                  <div
                    key={item?.id}
                    onClick={() => item?.id && navigate(`/details/${item?.id}`)}
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
      )}

      <Paginate
        onClick={(e) => setCurrentPage(Number(e.target.innerHTML))}
        pageCount={20}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        previousBtn={"<"}
        nextBtn={">"}
        classNamePaginationBtnArea={"paginationBtnArea"}
      />
    </div>
  );
};

export default MainPage;
