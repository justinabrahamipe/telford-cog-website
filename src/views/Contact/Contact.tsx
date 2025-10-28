'use client';

import React from "react";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import ContactsList from "./Components/ContactsList";

const Contact: React.FC = () => {
  return (
    <Page name="Contact Us">
      <PageBanner>
        <PageTitle title="Contact Us" />
      </PageBanner>
      <ContactsList />
    </Page>
  );
};

export default Contact;