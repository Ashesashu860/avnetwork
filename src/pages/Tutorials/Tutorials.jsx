import React, { useState, useEffect } from "react";
import { ContentContainer, FilterChips, StyledFab } from "../../components";
import { tutorialsCategories as categories } from "../masterData";
import { useHistory } from "react-router-dom";
import { VideoCard } from "./VideoCard";
import { useSelector, useDispatch } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import { UploadTutorial } from "./UploadTutorial";
import { getAllTutorialsAction } from "../../redux/actions";

const getDataFromState = (state) => ({
  currentUser: state?.users?.currentUser,
  allTutorials: state?.tutorials?.allTutorials,
});

export const Tutorials = ({ direction, latest }) => {
  const { currentUser, allTutorials } = useSelector(getDataFromState);
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getAllTutorialsAction());
  }, []);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openUploadDialog, setOpenUploadDialog] = useState(false);

  const onOpenUploadDialog = () => setOpenUploadDialog(true);
  const onCloseUploadDialog = () => setOpenUploadDialog(false);

  const onCategoryClick = (index) => {
    setSelectedCategory(tutorialsCategories[index]);
  };

  const history = useHistory();

  const onVideoClick = (id) => history.push(`/tutorials/${id}`);
  const filteredTutorials =
    selectedCategory === "All"
      ? allTutorials
      : allTutorials.filter(
          (tutorial) => tutorial?.category === selectedCategory
        );

  const tutorialsCategories = ["All", ...categories];
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
        {filteredTutorials?.map((tutorial) => (
          <VideoCard
            title={tutorial?.title}
            image={`//img.youtube.com/vi/${tutorial?.id}/0.jpg`}
            onClick={() => onVideoClick(tutorial?.id)}
          />
        ))}
        {filteredTutorials?.length === 0 && <h4>No Tutorials</h4>}
      </div>
      {currentUser?.canWriteBlogs && (
        <StyledFab
          variant="extended"
          primary
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "2rem",
          }}
          onClick={onOpenUploadDialog}
        >
          <AddIcon />
          Add Tutorial
        </StyledFab>
      )}
      <UploadTutorial open={openUploadDialog} onClose={onCloseUploadDialog} />
    </div>
  );
};
