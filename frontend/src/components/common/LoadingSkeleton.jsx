import React from "react";

const LoadingSkeleton = ({
  width = "100%",
  height = "100%",
  rounded = "10px",
}) => {
  return (
    <div
      className="skeleton"
      style={{
        width,
        height,
        borderRadius: rounded,
      }}
    ></div>
  );
};

export default LoadingSkeleton;
