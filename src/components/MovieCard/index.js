import { Card, CardBottomSection, Rating, Title } from "./styled";
import PlayBtn from "../../assets/images/playIcon.svg";
import { Image } from "react-bootstrap";
import Dummy from "../../assets/images/dummy.jpg";

const MovieCard = ({ data }) => {
  return (
    <Card>
      <Image
        src={
          data?.poster_path
            ? "https://image.tmdb.org/t/p/w500/" + data?.poster_path
            : Dummy
        }
        alt=''
        className='moviePoster'
      />
      <CardBottomSection className='d-flex align-items-center justify-content-between'>
        <div>
          <Title>{data?.original_title}</Title>
          <Rating>⭐ {Number(data?.popularity).toFixed()}/5</Rating>
        </div>
        <Image src={PlayBtn} alt='' className='playIcon' />
      </CardBottomSection>
    </Card>
  );
};

export default MovieCard;
