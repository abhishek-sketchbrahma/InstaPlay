import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../Navbar";
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
import VideoPlayerModal from "../VideoPlayerModal";
import PlayIcon from "../../assets/images/playIcon.svg";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [movieDetails, setMovieDetails] = useState(null);

  const getMovieDetail = async () => {
    let movieData = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=abac24cb3472244be1ad075dde55f834&language=en-US`
    );

    setMovieDetails(movieData?.data);
  };

  useEffect(() => {
    getMovieDetail();
  }, []);

  return (
    <DetailPageWrapper>
      <Navbar />

      <Row className='containerRow position-relative'>
        <Col md={4} className='containerCol contentSection '>
          <DetailSection className='position-absolute'>
            <Image src={LeftArrow} alt='' onClick={() => navigate(-1)} />
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
              Orginal Language <span>{movieDetails?.original_language}</span>
            </OriginalLanguage>
          </DetailSection>
        </Col>
        <Col
          md={8}
          className='containerCol imgSection'
          style={{
            backgroundImage: `linear-gradient(90deg, #000000 0%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/w500/${movieDetails?.backdrop_path})`,
          }}
        >
          <Image src={PlayIcon} alt='' onClick={() => setOpen(true)} />
        </Col>
      </Row>

      <VideoPlayerModal
        open={open}
        setOpen={setOpen}
        handleOpen={handleOpen}
        handleClose={handleClose}
      />
    </DetailPageWrapper>
  );
};

export default DetailPage;
