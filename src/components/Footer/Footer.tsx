'use client';

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
import { AdminToggle } from "../EditMode/AdminToggle";

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
      <Container maxWidth="xl" sx={{ px: { xs: 3, md: 2 } }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          sx={{ mb: 4 }}
        >
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-start' } }}>
            <FooterLocationInfo />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
            <FooterLocationMap />
          </Box>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="https://x.com/justinabrahmipe?t=bL-l613axvkuZdB9FoG-5Q&s=09"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.disabled',
                textDecoration: 'none',
                fontSize: '0.75rem',
                fontWeight: 400,
                '&:hover': {
                  color: 'text.secondary',
                  textDecoration: 'underline',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              Questions? Contact
            </Link>
            <Typography
              variant="body2"
              sx={{
                color: 'text.disabled',
                fontSize: '0.75rem',
              }}
            >
              •
            </Typography>
            <AdminToggle />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;