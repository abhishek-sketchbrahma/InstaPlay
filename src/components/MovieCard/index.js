import { Image } from "react-bootstrap";

import {
  Card,
  CardBottomSection,
  ImageContainer,
  Rating,
  Title,
} from "./styled";
import PlayBtn from "../../assets/images/playIcon.svg";
import NoImg from "../../assets/images/dummy.jpg";
import Star from "../../assets/images/star.png";
import HalfStar from "../../assets/images/halfStar.png";

const MovieCard = ({ data, onClick, index }) => {
  const actualRating = Number(data?.vote_average / 2);
  const numOfStars = Number(String(actualRating)?.split(".")?.[0]);

  const halfStars =
    Number(data?.vote_average / 2) - numOfStars >= 0.5 ? 0.5 : 0;

  return (
    <Card onClick={onClick} key={index}>
      <ImageContainer>
        <Image
          src={
            data?.backdrop_path
              ? "https://image.tmdb.org/t/p/w500/" + data?.backdrop_path
              : NoImg
          }
          alt='NoImg'
          className='moviePoster'
        />
      </ImageContainer>
      <CardBottomSection>
        <div className='cardDetails'>
          <Title>{data?.original_title}</Title>
          <Rating>
            <div className='d-flex align-items-center'>
              {Array(numOfStars)
                ?.fill(" ")
                ?.map((item, index) => {
                  return (
                    <span key={index}>
                      <Image src={Star} alt='Star' className='ratingStarIcon' />
                    </span>
                  );
                })}
              {halfStars !== 0 && (
                <Image
                  src={HalfStar}
                  alt='HalfStar'
                  className='ratingStarIcon'
                />
              )}
              <span className='ms-1'>{numOfStars + halfStars}/5</span>
            </div>
          </Rating>
        </div>
        <Image src={PlayBtn} alt='PlayBtn' className='playIcon' />
      </CardBottomSection>
    </Card>
  );
};

export default MovieCard;
