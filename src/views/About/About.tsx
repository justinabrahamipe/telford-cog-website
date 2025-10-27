'use client';

import React from "react";
import Page from "../../components/Page/Page";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import AboutUsContent from "./Components/AboutUsContent";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";

const About: React.FC = () => {
  return (
    <Page name="about">
      <PageBanner>
        <PageTitle title="About Us" />
      </PageBanner>
     <AboutUsContent/>
    </Page>
  );
};

export default About;