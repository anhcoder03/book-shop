import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import Slider from "../components/layout/Slider";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Header></Header>
      <Menu></Menu>
      <Slider></Slider>
    </HomePageStyles>
  );
};

export default HomePage;
