import React from "react";
import { Container, Box } from "@mui/material";
import Page from "../../components/Page/Page";
import PageBanner from "../../components/Page/Components/PageBanner/PageBanner";
import PageTitle from "../../components/Page/Components/PageTitle/PageTitle";
import Email from './Components/Email';
import Call from "./Components/Call";
import Whatsapp from "./Components/Whatsapp";

const Contact: React.FC = () => {
  return (
    <Page name="Contact Us">
      <PageBanner>
        <PageTitle title="Contact Us" />
      </PageBanner>
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box sx={{ flex: '0 0 300px' }}>
            <Email/>
          </Box>
          <Box sx={{ flex: '0 0 300px' }}>
            <Call/>
          </Box>
          <Box sx={{ flex: '0 0 300px' }}>
            <Whatsapp/>
          </Box>
        </Box>
      </Container>
    </Page>
  );
};

export default Contact;