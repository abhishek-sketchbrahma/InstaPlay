import styled from "styled-components";

export const DetailPageSection = styled.div`
  margin-top: 60px;

  .backArrow {
    height: 32px;
    width: 32px;
    margin-bottom: 40px;

    &:hover {
      cursor: pointer;
    }
  }
`;

export const MovieTitle = styled.h1`
  font-family: "Helvetica Neue LT Pro";
  font-style: normal;
  font-weight: 500;
  font-size: 42px;
  line-height: 50px;
  display: flex;
  align-items: flex-end;
  color: #ffffff;
  margin-bottom: 12px;
`;

export const MovieRating = styled.h4`
  font-family: "Helvetica Neue LT Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #ffffff;
  margin-bottom: 12px;
`;

export const MovieDescription = styled.p`
  font-family: "Helvetica Neue LT Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 152%;
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
`;

export const ReleaseDate = styled.div`
  font-family: "Helvetica Neue LT Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #ffffff;
  margin-bottom: 20px;

  span {
    margin-left: 64px;
  }
`;

export const OriginalLanguage = styled.div`
  font-family: "Helvetica Neue LT Pro";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  color: #ffffff;

  span {
    margin-left: 34px;
  }
`;

export const DetailPageWrapper = styled.div`
  background-image: url();
`;
