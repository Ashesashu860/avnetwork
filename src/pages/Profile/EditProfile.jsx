import { useState, useEffect } from "react";
import { BasicDetailsForm } from "../Register";
import { useHistory } from "react-router-dom";
import { StyledFab } from "../../components";
import { useDispatch } from "react-redux";
import { updateUserAction } from "../../redux/actions";

export const EditProfile = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const basicDetails = {
    ...props.location.state,
    deletedImages: [],
    newImages: [],
  };
  const [userDetails, setUserDetails] = useState(basicDetails);

  const onChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onImageChange = (event) => {
    setUserDetails({
      ...userDetails,
      newImages: [...userDetails?.newImages, event.target.files[0]],
    });
  };

  const onDeleteImage = (imageId) => {
    if (typeof imageId === "string") {
      const newImages = { ...userDetails?.userWorkImages };
      delete newImages[imageId];
      setUserDetails({
        ...userDetails,
        userWorkImages: newImages,
        deletedImages: [...userDetails?.deletedImages, imageId],
      });
    } else {
      setUserDetails({
        ...userDetails,
        newImages: userDetails?.newImages?.filter(
          (image) => image.name !== imageId.name
        ),
      });
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserDetails(basicDetails);
  }, []);

  return (
    <div className="wrapper">
      <BasicDetailsForm
        basicDetails={userDetails}
        onChange={onChange}
        onImageChange={onImageChange}
        onDeleteImage={onDeleteImage}
      />
      <div className="center" style={{ marginBottom: "1rem" }}>
        <StyledFab
          variant="extended"
          bold
          primary
          onClick={() => dispatch(updateUserAction(userDetails, history))}
        >
          Update Profile
        </StyledFab>
      </div>
    </div>
  );
};
