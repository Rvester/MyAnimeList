import React from "react";

export const AddToList = (props) => {
  return (
    <div className="mylist">
      <button {...props}>Add To Favorites</button>
    </div>
  );
};
