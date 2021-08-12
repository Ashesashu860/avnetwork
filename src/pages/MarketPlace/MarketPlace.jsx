import React from "react";
import { CreateProduct } from "./CreateProduct";

export const MarketPlace = () => {
  React.useEffect(() => window.scrollTo(0, 0));
  return (
    <div className="wrapper">
      <CreateProduct />
    </div>
  );
};
