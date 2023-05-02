/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useLocation } from "react-router-dom";

import { Image, Row, Col } from "react-bootstrap";

import Loader from "../../utils/Loader";
import AppLayout from "../../utils/AppLayout";

import moviesApi from "../../services/moviesApi";

import LeftArrow from "../../assets/images/leftArrow.svg";
import PlayIcon from "../../assets/images/playIcon.svg";
import Dummy from "../../assets/images/dummy.jpg";
import VideoPlayer from "../VideoPlayer";
import {
  DetailPageWrapper,
  MovieDescription,
  MovieRating,
  MovieTitle,
  OriginalLanguage,
  ReleaseDate,
  DetailSection,
} from "./style";

const MovieDetail = () => {
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

  useEffect(() => {
    getMovieDetail();
  }, []);

  const onSuccessMovieDetailFetch = (e) => {
    setMovieDetails(e?.data);
    setIsLoading(false);
  };

  const onFailMovieDetailFetch = (e) => {
    setIsLoading(false);
  };

  const onSuccessVideoDetail = (e) => {
    setMovieLink(e?.data?.results?.[0]?.key);
  };

  const getMovieDetail = useCallback(async () => {
    setIsLoading(true);
    moviesApi.MovieDetails(
      id,
      onSuccessMovieDetailFetch,
      onFailMovieDetailFetch
    );
  }, []);

  const getVideoData = async () => {
    moviesApi.getVideoDetail(id, onSuccessVideoDetail, () => {});
  };

  const onLeftArrowClick = () => {
    navigate("/home", {
      state: {
        currentPage: location?.state?.currentPage,
        searchedMovieName: location?.state?.searchedMovieName,
      },
    });
  };

  return (
    <>
      <DetailPageWrapper>
        <AppLayout>
          <>
            <Image
              src={LeftArrow}
              alt='LeftArrow'
              onClick={onLeftArrowClick}
              className='navigationArrowOnImage'
            />

            {isLoading ? (
              <div className='detailPageLoader'>
                <Loader />
              </div>
            ) : (
              <Row
                className={`containerRow position-relative ${
                  showVideo ? "forSmScreen" : ""
                }`}
              >
                <Col md={4} className='containerCol contentSection '>
                  <DetailSection className='position-absolute'>
                    <Image
                      src={LeftArrow}
                      alt='LeftArrow'
                      onClick={onLeftArrowClick}
                      className='navigationArrow'
                    />
                    <MovieTitle>{movieDetails?.original_title}</MovieTitle>
                    <MovieRating>
                      Rating: {numOfStars + halfStars}/5
                    </MovieRating>
                    <MovieDescription>
                      {movieDetails?.overview}
                    </MovieDescription>
                    <ReleaseDate>
                      Release Date
                      <span className='date'>
                        {" "}
                        {movieDetails?.release_date}
                      </span>
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
                    alt='LeftArrow'
                    onClick={() => {
                      setShowVideo(true);
                      getVideoData();
                    }}
                  />
                </Col>
              </Row>
            )}
          </>
        </AppLayout>
      </DetailPageWrapper>
      <VideoPlayer
        show={showVideo}
        handleClose={() => setShowVideo(false)}
        movieLink={movieLink}
      />
    </>
  );
};

export default MovieDetail;
