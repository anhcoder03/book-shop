import React from "react";
import styled from "styled-components";
const DashboardHeadingStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .dashboard-heading {
    font-weight: 600;
    font-size: 28px;
  }
`;

const DashboardHeading = ({ title = "", children }) => {
  return (
    <DashboardHeadingStyles className="mb-10 flex items-start justify-between">
      <div>
        <h1 className="dashboard-heading">{title}</h1>
      </div>
      {children}
    </DashboardHeadingStyles>
  );
};

export default DashboardHeading;
