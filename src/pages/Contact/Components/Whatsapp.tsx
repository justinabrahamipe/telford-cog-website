import React from "react";
import { Card, Typography, Box, IconButton, Link } from "@mui/material";
import { WhatsApp as WhatsAppIcon, Chat as ChatIcon } from "@mui/icons-material";

const Whatsapp: React.FC = () => {
  const openWhatsApp = (): void => {
    window.open('https://api.whatsapp.com/send/?phone=447411539877&text&app_absent=0', '_blank');
  }

  return (
    <Card
      sx={{
        width: 300,
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
        backgroundColor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4,
          backgroundColor: 'action.hover',
          '&::after': {
            transform: 'scaleX(1)',
          },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: 4,
          bottom: 0,
          left: 0,
          backgroundColor: 'success.main',
          transform: 'scaleX(0)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.25s ease-out',
        },
      }}
      onClick={openWhatsApp}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
        WhatsApp
      </Typography>

      <Box sx={{ mb: 2 }}>
        <WhatsAppIcon sx={{ fontSize: 50, color: 'success.main' }} />
      </Box>

      <Box sx={{ textAlign: 'center', mb: 2, minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Pr. Biju Cherian
        </Typography>
        <Link
          href='https://api.whatsapp.com/send/?phone=447411539877&text&app_absent=0'
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: 'success.main',
            textDecoration: 'none',
            fontSize: '0.875rem',
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={(e) => e.stopPropagation()}
        >
          +44 7411 539877
        </Link>
      </Box>

      <IconButton
        onClick={openWhatsApp}
        sx={{
          color: 'success.main',
          '&:hover': {
            backgroundColor: 'success.main',
            color: 'white',
          },
        }}
      >
        <ChatIcon />
      </IconButton>
    </Card>
  );
};

export default Whatsapp;