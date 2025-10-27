import React from "react";
import { Card, Typography, Box, IconButton, Link } from "@mui/material";
import { Phone as PhoneIcon, Call as CallIcon } from "@mui/icons-material";
import { EditableText } from "../../../components/EditMode/EditableText";

const Call: React.FC = () => {
const makeCall = (): void => {
  window.open('tel:+447411539877', '_self');
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
          backgroundColor: 'secondary.main',
          transform: 'scaleX(0)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.25s ease-out',
        },
      }}
      onClick={makeCall}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
        Call
      </Typography>

      <Box sx={{ mb: 2 }}>
        <PhoneIcon sx={{ fontSize: 50, color: 'secondary.main' }} />
      </Box>

      <Box sx={{ textAlign: 'center', mb: 2, minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Pr. Biju Cherian
        </Typography>
        <EditableText
          fieldName="contactPhone"
          pageSlug="contact"
          initialValue="+44 7411 539877"
          label="Edit Phone Number"
        >
          <Link
            href='tel:+447411539877'
            sx={{
              color: 'secondary.main',
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
        </EditableText>
      </Box>

      <IconButton
        onClick={makeCall}
        sx={{
          color: 'secondary.main',
          '&:hover': {
            backgroundColor: 'secondary.main',
            color: 'white',
          },
        }}
      >
        <CallIcon />
      </IconButton>
    </Card>
  );
};

export default Call;