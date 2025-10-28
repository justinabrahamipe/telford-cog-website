import React from 'react';
import { Card, Typography, Box, IconButton, Link } from "@mui/material";
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  WhatsApp as WhatsAppIcon,
  LocationOn as LocationIcon,
  Facebook as FacebookIcon,
  Language as WebsiteIcon,
  Send as SendIcon,
  Call as CallIcon,
  Chat as ChatIcon,
  OpenInNew as OpenIcon,
} from "@mui/icons-material";

interface ContactCardProps {
  title: string;
  description?: string | null;
  details: string;
  iconType: string;
  actionUrl: string;
  colorTheme: string;
  onClick?: () => void;
}

const iconMap: Record<string, React.ComponentType<any>> = {
  email: EmailIcon,
  phone: PhoneIcon,
  whatsapp: WhatsAppIcon,
  location: LocationIcon,
  facebook: FacebookIcon,
  website: WebsiteIcon,
};

const actionIconMap: Record<string, React.ComponentType<any>> = {
  email: SendIcon,
  phone: CallIcon,
  whatsapp: ChatIcon,
  location: OpenIcon,
  facebook: OpenIcon,
  website: OpenIcon,
};

const colorThemeMap: Record<string, string> = {
  primary: 'primary.main',
  secondary: 'secondary.main',
  success: 'success.main',
  info: 'info.main',
  warning: 'warning.main',
  error: 'error.main',
};

const ContactCard: React.FC<ContactCardProps> = ({
  title,
  description,
  details,
  iconType,
  actionUrl,
  colorTheme,
  onClick,
}) => {
  const MainIcon = iconMap[iconType] || EmailIcon;
  const ActionIcon = actionIconMap[iconType] || OpenIcon;
  const themeColor = colorThemeMap[colorTheme] || 'primary.main';

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (iconType === 'email') {
      window.location.href = actionUrl;
    } else if (iconType === 'phone') {
      window.open(actionUrl, '_self');
    } else {
      window.open(actionUrl, '_blank');
    }
  };

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
          backgroundColor: themeColor,
          transform: 'scaleX(0)',
          transformOrigin: 'bottom center',
          transition: 'transform 0.25s ease-out',
        },
      }}
      onClick={handleClick}
    >
      <Typography variant="h5" sx={{ fontWeight: 600, color: 'text.primary', mb: 2 }}>
        {title}
      </Typography>

      <Box sx={{ mb: 2 }}>
        <MainIcon sx={{ fontSize: 50, color: themeColor }} />
      </Box>

      <Box sx={{ textAlign: 'center', mb: 2, minHeight: 60, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            {description}
          </Typography>
        )}
        <Link
          href={actionUrl}
          sx={{
            color: themeColor,
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
          {details}
        </Link>
      </Box>

      <IconButton
        onClick={handleClick}
        sx={{
          color: themeColor,
          '&:hover': {
            backgroundColor: themeColor,
            color: 'white',
          },
        }}
      >
        <ActionIcon />
      </IconButton>
    </Card>
  );
};

export default ContactCard;
