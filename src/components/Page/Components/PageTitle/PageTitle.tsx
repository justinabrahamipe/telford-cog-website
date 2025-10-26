import React from "react";
import { Box, Typography } from "@mui/material";

interface PageTitleProps {
  title: string;
  subtitle?: string | null;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, subtitle = null }) => {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h1"
        sx={{
          color: 'white',
          fontFamily: '"Playfair Display", serif',
          fontSize: { xs: '2.5rem', md: '3.5rem' },
          fontWeight: 700,
          fontStyle: 'italic',
          mb: subtitle ? 2 : 0,
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="h6"
          sx={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 400,
            textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default PageTitle;