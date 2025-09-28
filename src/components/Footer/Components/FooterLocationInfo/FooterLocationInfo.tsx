import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { LocationOn, OpenInNew } from "@mui/icons-material";

const FooterLocationInfo: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography
        variant="h6"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
        }}
      >
        <LocationOn color="secondary" />
        Our Address
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          lineHeight: 1.8,
          mb: 2,
        }}
      >
        All Saints Parish Center,
        <br />
        Lychgate Walk, Wellington,
        <br />
        Telford - TF1 3HA
        <br />
        United Kingdom
      </Typography>

      <Button
        variant="outlined"
        size="small"
        href="https://goo.gl/maps/FEsb17CUKPp5KP1P7"
        target="_blank"
        rel="noopener noreferrer"
        endIcon={<OpenInNew />}
        sx={{
          color: 'secondary.main',
          borderColor: 'secondary.main',
          textTransform: 'none',
          alignSelf: 'flex-start',
          '&:hover': {
            borderColor: 'secondary.light',
            backgroundColor: 'rgba(245, 158, 11, 0.1)',
            transform: 'translateY(-1px)',
          },
          transition: 'all 0.2s ease-in-out',
        }}
      >
        View on Map
      </Button>
    </Box>
  );
};

export default FooterLocationInfo;