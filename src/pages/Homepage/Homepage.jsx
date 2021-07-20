import React from "react";
//import { withAuth } from "../../components";
import "./homepage.css";

export const Homepage = () => {
  React.useEffect(() => window.scrollTo(0, 0));

  return (
    <div className="wrapper homepage">
      <div>1</div>
      <div>2</div>
      <div>AD</div>
    </div>
  );
};

//export const Homepage = withAuth(HomepageWithoutAuth);
