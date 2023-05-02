import styled from "styled-components";

export const Card = styled.div`
  width: auto;
  height: 0;
  padding-bottom: 63%;
  margin: 16px 8px;

  .moviePoster {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    top: 0;
    left: 0;
    transition: transform 0.1s ease-in-out;

    &:hover {
      transform: scale(1.1);
      /* transition: all 0.2s ease-in-out; */
      z-index: -9999;
    }
  }

  .playIcon {
    height: 32px;
    width: 32px;
    object-fit: none;
    margin: 6.5px 0;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const CardBottomSection = styled.div`
  position: relative;
  display: flex;
  padding: 10px 24px 10px 24px;
  background: linear-gradient(0deg, #1a2b4a 0%, #2b507c 105.38%);
  flex: 1;

  .playIcon {
    position: absolute;
    right: 9%;
  }
  .cardDetails {
    width: 100%;
  }

  @media (max-width: 991.98px) {
    padding: 5px 24px;
  }
`;

export const Title = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #ffffff;
  width: calc(100% - 40px) !important;
  height: 20px;
  margin-bottom: 3px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media (max-width: 991.98px) {
    width: 120px;
  }
`;

export const Rating = styled.div`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #ccc;
  margin-bottom: 0px;
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 48%;
  background-color: linear-gradient(
    0deg,
    rgb(26, 43, 74) 0%,
    rgb(43, 80, 124) 105.38%
  );
  overflow: hidden;
`;
