import React from "react";
import { Box, Container } from "@mui/material";
import HomeAboutGridItem from "../HomeAboutGridItem/HomeAboutGridItem";

const HomeAboutGrid: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Box sx={{ flex: '0 0 300px' }}>
            <HomeAboutGridItem
              title="About Us"
              icon="beliefs"
              to="/about"
            />
          </Box>
          <Box sx={{ flex: '0 0 300px' }}>
            <HomeAboutGridItem
              title="Sermons"
              icon="ministries"
              to="/sermons"
            />
          </Box>
          <Box sx={{ flex: '0 0 300px' }}>
            <HomeAboutGridItem
              title="Our Leadership"
              icon="leadership"
              to="/leadership"
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeAboutGrid;