'use client';

import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import LeadersList from "./Components/LeadersList";

const Leadership: React.FC = () => {
  return (
    <Page name="leadership">
      <PageBanner>
        <PageTitle title="Our Leadership" />
      </PageBanner>
      <LeadersList />
    </Page>
  );
};

export default Leadership;