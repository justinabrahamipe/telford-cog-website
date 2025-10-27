import React from "react";
import { Box, Typography, IconButton, Stack, useTheme } from "@mui/material";
import {
  Facebook,
  YouTube,
  Instagram,
  WhatsApp,
} from "@mui/icons-material";
import Link from 'next/link';
import logoLight from '../logos/logo_full_light_750x200.png';
import logoDark from '../logos/logo_full_dark_750x200.png';
import ThemeToggle from '../../../ThemeToggle/ThemeToggle';

interface SocialMediaItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

const FooterMain: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const socialmedia: SocialMediaItem[] = [
    {
      name: "facebook",
      url: "https://www.facebook.com/mahanaimtelford/",
      icon: <Facebook />,
    },
    {
      name: "whatsapp",
      url: "https://wa.me/447411539877",
      icon: <WhatsApp />,
    },
    {
      name: "youtube",
      url: "https://youtube.com/channel/UCKUpMHwj5LLw2wEB2qK3lpA",
      icon: <YouTube />,
    },
    {
      name: "instagram",
      url: "https://www.instagram.com/mahanaimchurchtelford/?igshid=YmMyMTA2M2Y=",
      icon: <Instagram />,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Link href="/" style={{ display: 'block', textDecoration: 'none' }}>
        <Box
          sx={{
          '&:hover': {
            transform: 'scale(1.05)',
          },
          transition: 'transform 0.2s ease-in-out',
          }}
        >
          <Box
            component="img"
            src={isDark ? logoLight.src : logoDark.src}
            alt="Mahanaim Church of God"
            sx={{
              height: 60,
              width: 'auto',
            }}
          />
        </Box>
      </Link>
      <ThemeToggle size="small" showTooltip={false} />
      <Stack direction="row" spacing={1}>
        {socialmedia.map((item) => (
          <IconButton
            key={item.name}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: 'text.secondary',
              backgroundColor: 'action.hover',
              '&:hover': {
                color: 'secondary.main',
                backgroundColor: 'action.selected',
                transform: 'translateY(-2px)',
              },
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {item.icon}
          </IconButton>
        ))}
      </Stack>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          fontFamily: '"Playfair Display", serif',
          fontStyle: 'italic',
          textAlign: 'center',
        }}
      >
        "Let us fix our eyes on Jesus, the pioneer and perfecter of faith"
        <br />
        - Hebrews 12:2
      </Typography>
    </Box>
  );
};

export default FooterMain;