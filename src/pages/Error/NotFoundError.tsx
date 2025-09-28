import React from "react";
import Page from "../../components/Page/Page";
import "./NotFoundError.css";

const NotFoundError: React.FC = () => {
  return (
    <Page name="404">
      <div className="NotFoundError__content">
        <div className="NotFoundError__text">
          <div className="NotFoundError__text__error-title">404</div>
          <div className="NotFoundError__text__error-description">
            This page doesn't exist yet!
          </div>
        </div>
        <div className="NotFoundError__clear__bg"></div>
      </div>
    </Page>
  );
};

export default NotFoundError;