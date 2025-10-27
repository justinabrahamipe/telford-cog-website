import React from "react";
import { Card, CardContent, Typography, Box, IconButton, Link } from "@mui/material";
import { Email as EmailIcon, Send as SendIcon } from "@mui/icons-material";

const Email: React.FC = () => {
 const sendEmail = (): void => {
    const email = 'mahanaimcogtelford@gmail.com';
    const subject = 'Regd some query';
    const emailBody = 'Hi Team,\n';
    document.location = "mailto:"+email+"?subject="+subject+"&body="+emailBody;
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
          backgroundColor: 'primary.main',
          transform: 'scaleX(0)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.25s ease-out',
        },
      }}
      onClick={sendEmail}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
        Email
      </Typography>

      <Box sx={{ mb: 2 }}>
        <EmailIcon sx={{ fontSize: 50, color: 'primary.main' }} />
      </Box>

      <Box sx={{ textAlign: 'center', mb: 2, minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Link
          href={`mailto:mahanaimcogtelford@gmail.com`}
          sx={{
            color: 'primary.main',
            textDecoration: 'none',
            fontSize: '0.875rem',
            wordBreak: 'break-word',
            lineHeight: 1.4,
            '&:hover': {
              textDecoration: 'underline',
            },
          }}
          onClick={(e) => e.stopPropagation()}
        >
          mahanaimcogtelford@gmail.com
        </Link>
      </Box>

      <IconButton
        onClick={sendEmail}
        sx={{
          color: 'primary.main',
          '&:hover': {
            backgroundColor: 'primary.main',
            color: 'white',
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Card>
  );
};

export default Email;