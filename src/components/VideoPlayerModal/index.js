import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";

const VideoPlayerModal = ({ open, setOpen, handleOpen, handleClose }) => {
  const { id } = useParams();
  const [movieLink, setMovieLink] = useState(null);
  const getVideoData = async () => {
    let response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`
    );
    console.log(response?.data?.results?.[0]?.key);
    setMovieLink(response?.data?.results?.[0]?.key);
  };

  useEffect(() => {
    getVideoData();
  }, []);

  console.log("https://www.youtube.com/watch?v=" + movieLink);

  return (
    <>
      <Modal show={open} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <video width='750' height='500' controls>
            <source
              src={"https://www.youtube.com/watch?v=" + movieLink}
              type='video/mp4'
            />
          </video> */}
          <YouTube videoId={"https://www.youtube.com/watch?v=" + movieLink} />
        </Modal.Body>
        <video src={""} />
      </Modal>
    </>
  );
};

export default VideoPlayerModal;
