'use client';

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Typography,
  Chip,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  LiveTv as LiveIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logoDark from "../../assets/logos/logo_full_dark_750x200.png";
import logoLight from "../../assets/logos/logo_full_light_750x200.png";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import { useTheme as useCustomTheme } from "../../theme/ThemeContext";

// Helper function to handle both string and StaticImageData types
const getImageSrc = (img: any): string => {
  if (typeof img === 'string') {
    return img;
  }
  return img.src || img;
};

interface NavItem {
  label: string;
  path: string;
  isSpecial?: boolean;
}

const Header: React.FC = () => {
  const theme = useTheme();
  const { mode } = useCustomTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logo = getImageSrc(mode === 'dark' ? logoLight : logoDark);

  const navItems: NavItem[] = [
    { label: "About Us", path: "/about" },
    { label: "Sermons", path: "/sermons" },
    { label: "Gallery", path: "/gallery" },
    { label: "Leadership", path: "/leadership" },
    { label: "Contact", path: "/contact" },
  ];

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const isActivePath = (path: string) => pathname === path;

  const drawer = (
    <Box sx={{ width: 280, pt: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
        <ThemeToggle size="small" />
        <IconButton onClick={handleDrawerToggle} size="large">
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <Link href={item.path}>
              {/* @next-codemod-error This Link previously used the now removed `legacyBehavior` prop, and has a child that might not be an anchor. The codemod bailed out of lifting the child props to the Link. Check that the child component does not render an anchor, and potentially move the props manually to Link. */
              }
              <ListItemButton
                onClick={handleDrawerToggle}
                sx={{
                  mx: 2,
                  mb: 1,
                  borderRadius: 2,
                  backgroundColor: isActivePath(item.path) ? 'primary.main' : 'transparent',
                  color: isActivePath(item.path) ? 'white' : 'text.primary',
                  '&:hover': {
                    backgroundColor: isActivePath(item.path) ? 'primary.dark' : 'grey.100',
                  },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                />
                {item.isSpecial && (
                  <Chip
                    icon={<LiveIcon />}
                    label="LIVE"
                    size="small"
                    color="error"
                    sx={{ ml: 1 }}
                  />
                )}
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="xl" sx={{ px: 0 }}>
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo Section */}
            <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box
                  component="img"
                  src={logo}
                  alt="Mahanaim Church of God"
                  sx={{
                    height: { xs: 40, sm: 48 },
                    width: 'auto',
                  }}
                />
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 700,
                      lineHeight: 1.2,
                      background: 'linear-gradient(135deg, #2563eb 0%, #10b981 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Mahanaim Church of God
                  </Typography>
                  <Typography
                    variant="caption"
                    component="div"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      letterSpacing: 1,
                    }}
                  >
                    Telford - UK
                  </Typography>
                </Box>
              </Box>
            </Link>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {navItems.map((item) => (
                  <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                    <Button
                      variant={isActivePath(item.path) ? "contained" : "text"}
                      size="medium"
                      sx={{
                        minWidth: 'auto',
                        px: 2,
                        py: 1,
                        fontWeight: 500,
                        color: isActivePath(item.path) ? 'white' : 'text.primary',
                        '&:hover': {
                          backgroundColor: isActivePath(item.path) ? 'primary.dark' : 'grey.100',
                        },
                      }}
                      startIcon={item.isSpecial ? <LiveIcon /> : undefined}
                    >
                      {item.label}
                      {item.isSpecial && (
                        <Chip
                          label="LIVE"
                          size="small"
                          color="error"
                          sx={{ ml: 1, height: 20, fontSize: '0.6rem' }}
                        />
                      )}
                    </Button>
                  </Link>
                ))}
                <Box sx={{ ml: 2 }}>
                  <ThemeToggle size="medium" />
                </Box>
              </Box>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: 'background.paper',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;