// import {useState} from "react";
// import { ContentContainer, StyledForm,
//     StyledTextBox,
//     StyledTextArea,
//     StyledSelect,
//     ErrorText,
//     StyledLegend,
//     StyledImageContainer, } from "../../../components";
// import { FormControl, InputLabel } from "@material-ui/core";

//     const initialProfile = {}
// export const EditProfile = () => {

//     const [profile, setProfile] = useState(initialProfile)
//     const onChange = (event) => {
//         setProfile({
//           ...profile,
//           [event.target.name]: event.target.value,
//         });
//       };
//   return (<div className="wrapper">
// <div
//       className="wrapper center"
//       style={{ flexDirection: "column", paddingBottom: "2rem" }}
//     >
//       <ContentContainer
//         style={{ alignItems: "center" }}
//         subHeading={"Post your product"}
//         content={"Fill the required details to post your product"}
//       />
//       <StyledForm className="center" style={{ flexDirection: "column" }}>
//         <StyledTextBox
//           label="Title *"
//           variant="outlined"
//           name="title"
//           onChange={onChange}
//         />
//         <StyledTextBox
//           label="Location *"
//           variant="outlined"
//           name="location"
//           onChange={onChange}
//         />
//         <StyledTextBox
//           label="Brand *"
//           variant="outlined"
//           name="brand"
//           onChange={onChange}
//         />
//         <FormControl
//           variant="outlined"
//           style={{ minWidth: "100%", maxWidth: "100%" }}
//         >
//           <InputLabel>Category *</InputLabel>
//           <StyledSelect
//             native
//             onChange={onChange}
//             name="category"
//             label="Category"
//           >
//             <option value={""}></option>
//             {categories.map((category) => (
//               <option key={category} value={category}>
//                 {category}
//               </option>
//             ))}
//           </StyledSelect>
//         </FormControl>
//         <h4>Upload upto 4 photos of your work</h4>
//         <StyledImageContainer className="center" style={{ flexWrap: "wrap" }}>
//           {profile?.images?.map((image, index) => (
//             <ProductImageCard
//               selectedImage={image}
//               onDeleteImage={() => onDeleteImage(index)}
//             />
//           ))}
//           {product?.images?.length < 4 && (
//             <AddImageCard onImageChange={onImageChange} />
//           )}
//         </StyledImageContainer>
//       </StyledForm>
//       <Grid container wrap="nowrap" alignItems="center" justify="center">
//         <StyledFab
//           variant="extended"
//           bold
//           secondary
//           style={{ marginRight: "1rem" }}
//         >
//           Cancel
//         </StyledFab>
//         <StyledFab variant="extended" bold primary onClick={onCreateProduct}>
//           Update
//         </StyledFab>
//       </Grid>
//     </div>
//   </div>);
// };
