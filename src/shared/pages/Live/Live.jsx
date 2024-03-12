import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import "./Live.css";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const Live = function (props) {
  // const isMobile = window.innerWidth <= 550;
  // let width;
  // if (isMobile) {
  //   width = 500;
  // } else {
  //   width = window.innerWidth * 0.7;
  // }
  // let width = window.innerWidth;
  // console.log("https://www.facebook.com/mahanaimtelford/live/");
  return (
    // <Page name="Live">
    //   <PageBanner>
    //     <PageTitle title="Facebook Live" />
    //   </PageBanner>
    //   <div className="fb-live-parent">
    //     <Link href="https://www.facebook.com/mahanaimtelford/live/" />
    //     {/* <div
    //       class="fb-video"
    //       data-href={
    //         "https://www.facebook.com/mahanaimtelford/live/" || "www.google.com"
    //       }
    //       data-width={width}
    //       // data-width={500}
    //       data-show-text="false"
    //     ></div> */}
    //   </div>
    // </Page>
    <div>
      <Link
        to={{ pathname: "https://www.facebook.com/mahanaimtelford/live/" }}
        target="_blank"
      ></Link>
    </div>
  );
};

export default Live;
