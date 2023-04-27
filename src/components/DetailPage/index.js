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
  VideoPlayerContainer,
} from "./style";
import PlayIcon from "../../assets/images/playIcon.svg";
import CloseIcon from "../../assets/images/closeIcon.svg";
import { useLocation } from "react-router-dom";

const DetailPage = () => {
  const location = useLocation();
  console.log({ location });
  const { id } = useParams();
  const navigate = useNavigate();

  const [movieLink, setMovieLink] = useState(null);
  const [showVideo, setShowVideo] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingModal, setIsLoadingModal] = useState(false);

  const getMovieDetail = useCallback(async () => {
    setIsLoading(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((movieData) => {
        setMovieDetails(movieData?.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const getVideoData = useCallback(async () => {
    setIsLoadingModal(true);
    await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        setMovieLink(response?.data?.results?.[0]?.key);
      })
      .finally(() => {
        setIsLoadingModal(false);
      });
  }, []);

  useEffect(() => {
    getMovieDetail();
  }, []);

  // useEffect(() => {
  //   if (showVideo) {
  //     getVideoData();
  //   }
  // }, [showVideo]);

  return (
    <>
      <DetailPageWrapper className={`position-relative`}>
        <Navbar />
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
                />
                <MovieTitle>{movieDetails?.original_title}</MovieTitle>
                <MovieRating>
                  Rating: {Number(movieDetails?.popularity)?.toFixed()}/5
                </MovieRating>
                <MovieDescription>{movieDetails?.overview}</MovieDescription>
                <ReleaseDate>
                  Release Date
                  <span className='ml-5'> {movieDetails?.release_date}</span>
                </ReleaseDate>
                <OriginalLanguage>
                  Orginal Language{" "}
                  <span>{movieDetails?.original_language}</span>
                </OriginalLanguage>
              </DetailSection>
            </Col>
            <Col
              md={8}
              className='containerCol imgSection'
              style={{
                backgroundImage: `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%),
             url(https://image.tmdb.org/t/p/original/${movieDetails?.backdrop_path})`,
              }}
            >
              <Image
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

        {showVideo && (
          <VideoPlayerContainer className='position-absolute'>
            <div className='closeIconContainer'>
              <Image
                src={CloseIcon}
                alt=''
                onClick={() => setShowVideo(false)}
              />
            </div>
            {isLoadingModal ? (
              <div>
                <h1>Loading...</h1>
              </div>
            ) : (
              <iframe
                width='852px'
                height='374px'
                src={`https://www.youtube.com/embed/${movieLink}`}
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowfullscreen
                className='videoPlayer'
              ></iframe>
            )}
          </VideoPlayerContainer>
        )}
      </DetailPageWrapper>
    </>
  );
};

export default DetailPage;
