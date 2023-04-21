import styled from "styled-components";

export const Card = styled.div`
  height: "178px";
  width: "280px";
  background: linear-gradient(0deg, #1a2b4a 0%, #2b507c 105.38%);
  margin: 16px 8px;
  display: flex;
  flex-direction: column;

  .moviePoster {
    object-fit: cover;
    scale: 100%;
    width: 280px;
    height: 137px;
  }

  .playIcon {
    height: 32px;
    width: 32px;
    object-fit: none;
  }

  &:hover {
    cursor: pointer;
  }
`;

export const CardBottomSection = styled.div`
  padding: 10px 24px;
`;

export const Title = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 140%;
  color: #ffffff;
  width: 172px;
  margin-bottom: 3px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Rating = styled.p`
  font-family: "Poppins";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 140%;
  color: #ccc;
  margin-bottom: 0px;
`;
