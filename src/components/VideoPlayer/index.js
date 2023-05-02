import React from "react";
import { Image } from "react-bootstrap";

import Modal from "react-bootstrap/Modal";
import CloseIcon from "../../assets/images/closeIcon.svg";

const VideoPlayer = ({ show, handleClose, movieLink }) => {
  return (
    <Modal
      show={show}
      onHide={handleClose}
      //   backdrop='static'
      //   keyboard={false}
      className='videoModal'
      centered
    >
      <div className='closeIconContainer'>
        <Image src={CloseIcon} alt='CloseIcon' onClick={handleClose} />
      </div>
      <div className='parentContainer'>
        <iframe
          className='videoPlayer'
          src={`https://www.youtube.com/embed/${movieLink}`}
          title='YouTube video player'
          frameborder='0'
          allowfullscreen='allowfullscreen'
          mozallowfullscreen='mozallowfullscreen'
          msallowfullscreen='msallowfullscreen'
          oallowfullscreen='oallowfullscreen'
          webkitallowfullscreen='webkitallowfullscreen'
        />
      </div>
    </Modal>
  );
};

export default VideoPlayer;
