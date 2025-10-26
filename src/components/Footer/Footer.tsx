import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Link,
  Divider,
} from "@mui/material";
import FooterMain from "./Components/FooterMain/FooterMain";
import FooterLocationInfo from "./Components/FooterLocationInfo/FooterLocationInfo";
import FooterLocationMap from "./Components/FooterLocationMap/FooterLocationMap";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        color: 'text.primary',
        pt: 6,
        pb: 3,
        mt: 'auto',
        borderTop: 1,
        borderColor: 'divider',
        transition: 'all 0.3s ease',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ mb: 4 }}
        >
          <Box sx={{ flex: 1 }}>
            <FooterLocationInfo />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FooterLocationMap />
          </Box>
          <Box sx={{ flex: 1 }}>
            <FooterMain />
          </Box>
        </Stack>

        <Divider sx={{ borderColor: 'divider', mb: 3 }} />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              textAlign: 'center',
            }}
          >
            © {new Date().getFullYear()} Mahanaim Church of God, Telford. All rights reserved.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'text.disabled',
              display: { xs: 'block', sm: 'none' },
            }}
          >
            •
          </Typography>
          <Link
            href="https://www.facebook.com/Jubbafied"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'secondary.main',
              textDecoration: 'none',
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                color: 'secondary.light',
                textDecoration: 'underline',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            Designed and developed by Jubbafied Digitization Solutions
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;