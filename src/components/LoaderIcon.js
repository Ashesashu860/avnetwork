import styled from "styled-components";

const StyledLoader = styled.div`
  display: inline-block;
  position: relative;
  width: 5rem;
  height: 2rem;
  & div {
    position: absolute;
    top: 50%;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: var(--primary);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }
  & div:nth-child(1) {
    left: 0.5rem;
    animation: lds-ellipsis1 0.6s infinite;
  }
  & div:nth-child(2) {
    left: 0.5rem;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-child(3) {
    left: 2rem;
    animation: lds-ellipsis2 0.6s infinite;
  }
  & div:nth-child(4) {
    left: 4rem;
    animation: lds-ellipsis3 0.6s infinite;
  }
  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(1.5rem, 0);
    }
  }
`;
export const LoaderIcon = () => {
  return (
    <StyledLoader>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledLoader>
  );
};
