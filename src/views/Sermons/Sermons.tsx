'use client';

import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import MessageVideos from "./Components/SermonVideos";
import "./Components/Sermons.css"

const Sermons: React.FC = () => {
  return (
    <Page name="Sermons">
      <PageBanner>
        <PageTitle title="Sermons" />
      </PageBanner>
     <MessageVideos/>
    </Page>
  );
};

export default Sermons;