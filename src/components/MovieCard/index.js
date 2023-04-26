import { Card, CardBottomSection, Rating, Title } from "./styled";
import PlayBtn from "../../assets/images/playIcon.svg";
import { Image } from "react-bootstrap";
import Dummy from "../../assets/images/dummy.jpg";

const MovieCard = ({ data }) => {
  const movieRating = Number((data?.vote_average / 2).toFixed());
  return (
    <Card>
      <Image
        src={
          data?.backdrop_path
            ? "https://image.tmdb.org/t/p/w500/" + data?.backdrop_path
            : Dummy
        }
        alt=''
        className='moviePoster'
      />
      <CardBottomSection className='d-flex align-items-center justify-content-between'>
        <div>
          <Title>{data?.original_title}</Title>
          <Rating>
            <div className='d-flex'>
              {Array(movieRating)
                ?.fill(" ")
                ?.map((item) => {
                  return <span>⭐</span>;
                })}
              <span className='ms-1'>{movieRating}/5</span>
            </div>
          </Rating>
        </div>
        <Image src={PlayBtn} alt='' className='playIcon' />
      </CardBottomSection>
    </Card>
  );
};

export default MovieCard;
