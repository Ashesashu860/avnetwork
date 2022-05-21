import React from "react";
import styled from "styled-components";
import { Card } from "@material-ui/core";

const VideoCardContainer = styled(Card)`
  width: 14rem;
  justify-content: flex-start !important;
  flex-direction: column;
  margin: 1rem 0.5rem;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    box-shadow: 1px 3px 6px 1px rgb(0, 0, 0, 14%) !important;
  }
  @media screen and (max-width: 450px) {
    width: 46%;
  }
  @media screen and (max-width: 300px) {
    width: 80%;
  }
  box-shadow: 0;
`;

const VideoHeading = styled.div`
  color: #999;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-size: 1.1rem;
  display: -webkit-box;
  color: #000;
`;

const ImageContainer = styled.div`
  background-size: cover !important;
  background-repeat: no-repeat !important;
  background: ${(props) => `url(${props.image})`};
  width: 100%;
  height: 10rem;
  background-color: rgb(247, 247, 247);
  background-position: center center;
  border-bottom: 1px solid #ddd;
`;

const VideoContentContainer = styled.div`
  padding: 0.5rem 1rem;
  width: 100%;
  font-size: 0.8rem;
  & > *:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`;

const VideoSubContainer = styled.div`
  & > * {
    margin-bottom: 0.2rem;
  }
`;

const Button = styled.div`
  background-color: var(--primary);
  color: #fff;
  width: 100%;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0.6rem;
  text-align: center;
`;

const StyledText = styled.p`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;
  color: #00000099;
`;

export const VideoCard = ({ image, title, likes, comments, onClick }) => {
  return (
    <VideoCardContainer className="center" onClick={onClick}>
      <ImageContainer image={image}></ImageContainer>
      <VideoContentContainer>
        <VideoHeading>{title}</VideoHeading>
        <VideoSubContainer>
          <StyledText>Likes: {likes || "0"}</StyledText>
          <StyledText>Comments: {comments || "0"}</StyledText>
        </VideoSubContainer>
      </VideoContentContainer>
      {/* <Button>CHECKOUT</Button> */}
    </VideoCardContainer>
  );
};
