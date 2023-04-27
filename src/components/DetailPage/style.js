import styled from "styled-components";

export const DetailPageWrapper = styled.div`
  width: 100%;
  position: relative;
  color: #fff;
  font-style: normal;
  font-family: "Helvetica Neue";
  background: #000;
  height: 100vh;

  .navigationArrowOnImage {
    position: absolute;
    z-index: 99999999999;
    display: none;

    @media (max-width: 767.98px) {
      display: block;
      left: 26px;
      top: 86px;
    }
    @media (max-width: 575.98px) {
      top: 110px;
    }
  }

  .forSmScreen {
    @media (max-width: 575.98px) {
      height: calc(100vh - 150px) !important;
      overflow: hidden;
    }
  }

  .containerRow {
    margin: 0px !important;

    @media (max-width: 767.98px) {
      position: relative !important;
      display: flex;
      flex-direction: column-reverse;
    }
  }

  .containerCol {
    padding: 0px !important;
  }

  .imgSection {
    background-size: cover;
    height: calc(100vh - 71px);
    display: flex;
    justify-content: center;
    @media (max-width: 1199.98px) {
      justify-content: end;
    }
    @media (max-width: 767.98px) {
      height: 375px;
    }
    @media (max-width: 575.98px) {
      height: 260px;
    }

    img {
      height: 103px;
      width: 103px;
      margin: auto;
      &:hover {
        cursor: pointer;
      }

      @media (max-width: 1199.98px) {
        margin: auto 30%;
      }
      @media (max-width: 767.98px) {
        margin: auto;
      }
    }
  }

  .contentSection {
    background-color: #000;

    img {
      margin-bottom: 40px;
      height: 32px;
      width: 32px;
      &:hover {
        cursor: pointer;
      }

      @media (max-width: 1399.98px) {
        margin-bottom: 15px;
      }
    }
  }
`;

export const MovieTitle = styled.div`
  font-weight: 500;
  font-size: 42px;
  line-height: 50px;
  margin-bottom: 12px;
  @media (max-width: 767.98px) {
    margin-top: 20px;
    font-weight: 500;
    font-size: 24px;
    line-height: 29px;
  }
`;

export const MovieRating = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 12px;
  @media (max-width: 767.98px) {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }
`;

export const MovieDescription = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 152%;
  margin-bottom: 24px;
  /* max-height: 186px;
  overflow-y: scroll; */
  color: rgba(255, 255, 255, 0.7);

  @media (max-width: 767.98px) {
    height: auto;
    overflow-y: hidden;
  }
  @media (max-width: 575.98px) {
    font-size: 16px;
    line-height: 152%;
  }
`;

export const ReleaseDate = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 20px;
  .date {
    margin-left: 64px;
  }
  @media (max-width: 767.98px) {
    font-size: 14px;
    line-height: 17px;
  }
`;

export const OriginalLanguage = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  .language {
    margin-left: 34px;
  }

  @media (max-width: 767.98px) {
    font-size: 14px;
    line-height: 17px;
    .language {
      margin-left: 40px;
    }
  }
`;

export const DetailSection = styled.div`
  max-width: 53%;
  left: 53px;
  top: 71px;
  position: absolute;

  @media (max-width: 767.98px) {
    position: relative !important;
    top: 0;
    margin-bottom: 31px;
    max-width: 85%;

    .navigationArrow {
      display: none;
    }
  }
  @media (max-width: 575.98px) {
    left: 20px;
    max-width: 92%;
  }
`;

export const VideoPlayerContainer = styled.div``;
