import styled from "styled-components";

export const AdsContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  & > h1 {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    color: #fff;
    text-shadow: 2px 0 0 var(--primary), -2px 0 0 var(--primary),
      0 2px 0 var(--primary), 0 -2px 0 var(--primary), 1px 1px var(--primary),
      -1px -1px 0 var(--primary), 1px -1px 0 var(--primary),
      -1px 1px 0 var(--primary);
    text-align: center;
    min-width: 100%;
    margin-top: 1rem;
    flex: 20% !important;
  }
  & > div {
    min-width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: ${(props) => (props?.column ? "column" : "row")};
    flex: 80% !important;
    & > div {
      flex: 50%;
    }
  }

  @media screen and (max-width: 768px) {
    & > h1 {
      font-size: 1.6rem;
    }
    & > div {
      flex-direction: column;
      & > div {
        flex: 100%;
      }
    }
  }
`;
