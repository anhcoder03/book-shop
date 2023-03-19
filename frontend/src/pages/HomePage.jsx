import React from "react";
import styled from "styled-components";
import Header from "../components/layout/Header";
import Menu from "../components/layout/Menu";
import Slider from "../components/layout/Slider";
import Literature from "../modules/home/Literature";
import Service from "../modules/home/Service";

const HomePageStyles = styled.div``;

const HomePage = () => {
  return (
    <HomePageStyles>
      <Header></Header>
      <Menu></Menu>
      <Slider></Slider>
      <div className="container">
        <Service></Service>
        <Literature></Literature>
      </div>
    </HomePageStyles>
  );
};

export default HomePage;
