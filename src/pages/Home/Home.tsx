import React from "react";
import Page from "../../components/Page/Page";
import HomeGreetings from "../../pages/Home/Components/HomeGreetings/HomeGreetings";
import HomeMeetingInfo from "../../pages/Home/Components/HomeMeetingInfo/HomeMeetingInfo";
import HomeAbout from "../../pages/Home/Components/HomeAbout/HomeAbout";
import WelcomeHero from "./Components/WelcomeSlider";
import './Home.css';

const Home: React.FC = () => {
  return (
    <Page name="home">
      <WelcomeHero/>
      <HomeGreetings />
      <HomeMeetingInfo/>
      <HomeAbout />
    </Page>
  );
};

export default Home;