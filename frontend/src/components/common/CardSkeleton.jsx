import React from "react";
import LoadingSkeleton from "./LoadingSkeleton";

const CardSkeleton = () => {
  return (
    <div className="cursor-pointer">
      <LoadingSkeleton height="260px" />
      <div className="mt-2">
        <LoadingSkeleton height="8px" />
        <div className="flex items-center justify-between mt-2 select-none">
          <LoadingSkeleton height="8px" width="20%" />
          <LoadingSkeleton height="8px" width="40%" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
