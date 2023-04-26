import styled from "styled-components";
export const MainPageLayout = styled.div`
  color: white;
  margin-bottom: 55px;
  margin: 55px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h3 {
    margin-bottom: 32px;
    /* margin-left: 5%; */
    margin-top: 50px;

    @media (max-width: 1200px) {
      /* margin-left: 24px; */
    }
    @media (max-width: 991.98px) {
      /* margin-left: 8%; */
    }
    @media (max-width: 767.98px) {
      /* margin-left: 22%; */
    }
    @media (max-width: 575.98px) {
      /* margin-left: 5%; */
    }
  }
`;

export const BannerSection = styled.div`
  margin-bottom: 56px;
  img {
    object-fit: cover;
    width: 100%;
  }
`;

export const MovieSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;

  /* > div {
    width: 25%;
  } */

  @media (max-width: 1200px) {
    /* > div {
      width: auto;
    } */
  }
`;
