import React from "react";
import { Box, Container } from "@mui/material";

interface PageBannerProps {
  children: React.ReactNode;
}

const PageBanner: React.FC<PageBannerProps> = ({ children }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 120, md: 160 },
        backgroundColor: 'primary.main',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: 'linear-gradient(135deg, rgba(37, 99, 235, 0.9) 0%, rgba(16, 185, 129, 0.9) 100%)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.2)',
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          py: { xs: 3, md: 4 }
        }}
      >
        {children}
      </Container>
    </Box>
  );
};

export default PageBanner;