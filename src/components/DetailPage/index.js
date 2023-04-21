import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../Navbar";
import LeftArrow from "../../assets/images/leftArrow.svg";
import { Container, Image } from "react-bootstrap";
import {
  DetailPageSection,
  MovieDescription,
  MovieRating,
  MovieTitle,
  OriginalLanguage,
  ReleaseDate,
} from "./style";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  console.log({ movieDetails });
  return (
    <>
      <DetailPageWrapper>
        <Navbar />
        <Container>
          <div style={{ width: "512px" }}>
            <DetailPageSection>
              <Image
                src={LeftArrow}
                alt=''
                onClick={() => navigate(-1)}
                className='backArrow'
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
                Orginal Language <span>{movieDetails?.original_language}</span>
              </OriginalLanguage>
            </DetailPageSection>
          </div>
        </Container>
        <div>
          <Image
            src={"https://image.tmdb.org/t/p/w500/" + movieDetails?.poster_path}
            alt=''
          />
        </div>
      </DetailPageWrapper>
    </>
  );
};

export default DetailPage;
