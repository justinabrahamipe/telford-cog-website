import React from "react";
import Link from "next/link";
import { Box, Container, Typography, Button as MuiButton } from "@mui/material";
import { EditableSection } from "../../../../components/EditMode/EditableSection";

const HomeAboutOverview: React.FC = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <EditableSection
          sectionId="home-overview"
          pageSlug="home"
          title="Overview"
          content="<p>We are a church that honors God's Word, believes in the work of the Holy Spirit, and worship the Lord in spirit and truth.</p><p>Caring and loving church that has been in existence since 01 July 2021.</p><p>Missionary-minded church that believes in reaching the unreached with the love of Jesus Christ.</p>"
        >
          <Box
            sx={{
              textAlign: 'center',
              px: { xs: 2, md: 6 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                mb: 5,
                fontFamily: '"Playfair Display", serif',
                fontWeight: 300,
                color: 'text.primary',
              }}
            >
              Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.8,
                color: 'text.secondary',
                mb: 4,
                maxWidth: '800px',
                mx: 'auto',
              }}
            >
              We are a church that honors God's Word, believes in the work of the
              Holy Spirit, and worship the Lord in spirit and truth.
              <br />
              <br />
              Caring and loving church that has been in existence since 01 July
              2021.
              <br />
              <br />
              Missionary-minded church that believes in reaching the unreached
              with the love of Jesus Christ.
            </Typography>
            <Link href="/about">
              <MuiButton
                variant="outlined"
                size="large"
                sx={{
                  mt: 2,
                  px: 4,
                  py: 1.5,
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  '&:hover': {
                    borderColor: 'primary.dark',
                    backgroundColor: 'primary.main',
                    color: 'white',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
              >
                Learn More
              </MuiButton>
            </Link>
          </Box>
        </EditableSection>
      </Container>
    </Box>
  );
};

export default HomeAboutOverview;