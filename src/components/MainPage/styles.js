import styled from "styled-components";
export const MainPageLayout = styled.div`
  color: #fff;
  margin-bottom: 55px;
  margin: 55px 60px;
  display: flex;
  justify-content: center;
  flex-direction: column;

  h3 {
    margin-bottom: 32px;
    margin-top: 50px;
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
`;
