/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import Navbar from "../Navbar";
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import LeftArrow from "../../assets/images/leftArrow.svg";
import { Image, Row, Col } from "react-bootstrap";
import {
  DetailPageWrapper,
  MovieDescription,
  MovieRating,
  MovieTitle,
  OriginalLanguage,
  ReleaseDate,
  DetailSection,
} from "./style";
import PlayIcon from "../../assets/images/playIcon.svg";
import { useLocation } from "react-router-dom";
import Dummy from "../../assets/images/dummy.jpg";
import VideoPlayer from "../VideoPlayer";

const DetailPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieLink, setMovieLink] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const actualRating = Number(movieDetails?.vote_average / 2);
  const numOfStars = Number(String(actualRating)?.split(".")?.[0]);
  const halfStars =
    Number(movieDetails?.vote_average / 2) - numOfStars >= 0.5 ? 0.5 : 0;

  const getMovieDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      let movieData = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      );
      setMovieDetails(movieData?.data);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  }, []);

  const getVideoData = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );

    setMovieLink(response?.data?.results?.[0]?.key);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <>
      <DetailPageWrapper>
        <Navbar />
        <Image
          src={LeftArrow}
          alt=''
          onClick={() =>
            navigate("/home", {
              state: {
                currentPage: location?.state?.currentPage,
                searchedMovieName: location?.state?.searchedMovieName,
              },
            })
          }
          className='navigationArrowOnImage'
        />

        {isLoading ? (
          <div className='detailPageLoader'>
            <h1>Loading...</h1>
          </div>
        ) : (
          <Row
            className={`containerRow position-relative ${
              showVideo && "forSmScreen"
            }`}
          >
            <Col md={4} className='containerCol contentSection '>
              <DetailSection className='position-absolute'>
                <Image
                  src={LeftArrow}
                  alt=''
                  onClick={() =>
                    navigate("/home", {
                      state: {
                        currentPage: location?.state?.currentPage,
                        searchedMovieName: location?.state?.searchedMovieName,
                      },
                    })
                  }
                  className='navigationArrow'
                />
                <MovieTitle>{movieDetails?.original_title}</MovieTitle>
                <MovieRating>Rating: {numOfStars + halfStars}/5</MovieRating>
                <MovieDescription>{movieDetails?.overview}</MovieDescription>
                <ReleaseDate>
                  Release Date
                  <span className='date'> {movieDetails?.release_date}</span>
                </ReleaseDate>
                <OriginalLanguage>
                  Orginal Language
                  <span className='language'>
                    {movieDetails?.original_language}
                  </span>
                </OriginalLanguage>
              </DetailSection>
            </Col>
            <Col
              md={8}
              className='containerCol imgSection'
              style={{
                backgroundImage: `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%),
             url(${
               movieDetails?.backdrop_path
                 ? `https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path}`
                 : Dummy
             })`,
              }}
            >
              <Image
                className='playBtn'
                src={PlayIcon}
                alt=''
                onClick={() => {
                  setShowVideo(true);
                  getVideoData();
                }}
              />
            </Col>
          </Row>
        )}
      </DetailPageWrapper>
      <VideoPlayer
        show={showVideo}
        handleClose={() => setShowVideo(false)}
        movieLink={movieLink}
      />
    </>
  );
};

export default DetailPage;
