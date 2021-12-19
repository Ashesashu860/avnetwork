import styled from "styled-components";

export const AdsContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 100%;
  max-height: 100%;
  & > div:first-child {
    width: 80vw;
  }
  & > div:last-child {
    position: sticky;
    top: 0;
    width: 20vw;
  }
  @media screen and (max-width: 768px) {
    & > div:first-child {
      width: 100vw;
    }
  }
`;
