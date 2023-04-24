import styled from "styled-components";

export const DetailPageWrapper = styled.div`
  color: #fff;
  font-style: normal;
  font-family: "Helvetica Neue LT Pro";
  background: #000;

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
    height: calc(100vh - 70px);
    display: flex;
    justify-content: center;
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
`;

export const MovieRating = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  margin-bottom: 12px;
`;

export const MovieDescription = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 152%;
  margin-bottom: 24px;
`;

export const ReleaseDate = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-bottom: 20px;
`;

export const OriginalLanguage = styled.div`
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

export const DetailSection = styled.div`
  max-width: 512px;
  left: 120px;
  top: 133px;
  position: absolute;

  @media (max-width: 1399.98px) {
    left: 100px;
  }
  @media (max-width: 1199.98px) {
    max-width: 400px;
    left: 80px;
  }
  @media (max-width: 991.98px) {
    max-width: 350px;
    top: 90px;
  }
  @media (max-width: 767.98px) {
    position: relative !important;
    top: 0;
    margin-bottom: 30px;
    max-width: 85%;
  }
  @media (max-width: 575.98px) {
    min-width: 335px;
    max-width: 80%;
    margin: 0px -61px 20px -61px;
  }
`;

export const VideoPlayerContainer = styled.div`
  height: 100%;
  width: 100vw;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  top: 0;
  background-color: rgba(14, 23, 30, 0.8);

  .closeIconContainer {
    display: flex;
    flex-direction: row-reverse;
    width: 900px;

    @media (max-width: 991.98px) {
      width: 750px;
    }

    @media (max-width: 767.98px) {
      width: 550px;
    }

    @media (max-width: 575.98px) {
      width: 375px;
    }
  }

  .videoPlayer {
    @media (max-width: 991.98px) {
      width: 700px;
      height: 308px;
    }
    @media (max-width: 767.98px) {
      width: 500px;
      height: 183px;
    }

    @media (max-width: 575.98px) {
      width: 375px;
      height: 200px;
    }
  }

  @media (max-width: 575.98px) {
    height: calc(100vh - 60px);
  }
`;
