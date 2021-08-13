import { Avatar } from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";

export const AddImageCard = ({ onImageChange }) => (
  <Avatar
    variant="rounded"
    style={{ backgroundColor: "#ddd", height: "7rem", width: "7rem" }}
    onClick={() => document.getElementById("product_image").click()}
  >
    <AddAPhotoIcon style={{ color: "var(--primary)" }} />
    <input
      id="product_image"
      type="file"
      onChange={onImageChange}
      style={{ display: "none" }}
    />
  </Avatar>
);
