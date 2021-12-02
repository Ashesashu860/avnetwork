import { Grid } from "@material-ui/core";
import React from "react";
import { ContentContainer, FilterChips } from "../../components";
import { tutorialsCategories } from "../masterData";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { VideoCard } from "./VideoCard";

export const Tutorials = ({ direction, latest }) => {
  React.useEffect(() => window.scrollTo(0, 0), []);

  const [selectedCategory, setSelectedCategory] = React.useState("");
  const onCategoryClick = (index) => {
    setSelectedCategory(tutorialsCategories[index]);
  };

  const history = useHistory();

  const onVideoClick = (id) => history.push(`/tutorials/${id}`);

  return (
    <div className="wrapper">
      <ContentContainer
        subHeading={"Learn From Experts"}
        style={{ alignItems: "center" }}
      />
      <FilterChips
        options={tutorialsCategories}
        selectedOption={selectedCategory}
        onOptionChange={onCategoryClick}
        style={{ marginBottom: "1rem" }}
      />
      <div
        className="center"
        style={{
          display: "inline-flex",
          flexWrap: direction === "row" ? "nowrap" : "wrap",
          justifyContent: latest ? "space-evenly" : "initial",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <VideoCard
          image="//img.youtube.com/vi/KHH0_YVUxfE/0.jpg"
          onClick={() => onVideoClick("KHH0_YVUxfE")}
        />
        <VideoCard
          image="//img.youtube.com/vi/FvyX1GIE8GM/0.jpg"
          onClick={() => onVideoClick("FvyX1GIE8GM")}
        />
      </div>
    </div>
  );
};
