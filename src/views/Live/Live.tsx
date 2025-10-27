import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import "./Live.css";

const Live: React.FC = () => {
  // const isMobile = window.innerWidth <= 550;
  // let width;
  // if (isMobile) {
  //   width = 500;
  // } else {
  //   width = window.innerWidth * 0.7;
  // }
  const width = window.innerWidth;
  return (
    <Page name="Live">
      <PageBanner>
        <PageTitle title="Facebook Live" />
      </PageBanner>
      <div className="fb-live-parent">
        <div
          className="fb-video"
          data-href="https://www.facebook.com/mahanaimtelford/live"
          data-width={width}
          // data-width={500}
          data-show-text="false"
        ></div>
      </div>
    </Page>
  );
};

export default Live;