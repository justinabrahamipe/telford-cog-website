import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import KidsAndYouthGallery from "./Components/KidsAndYouthGallery";

const KidsAndYouth: React.FC = () => {
  return (
    <Page name="KidsAndYouth">
      <PageBanner>
        <PageTitle title="Kids and Youth" />
      </PageBanner>
      <KidsAndYouthGallery />
    </Page>
  );
};

export default KidsAndYouth;