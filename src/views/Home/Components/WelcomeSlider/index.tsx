import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import {
  CalendarToday,
  LocationOn,
  People,
  ChevronRight,
} from "@mui/icons-material";
import Link from "next/link";
import { useTheme as useCustomTheme } from "../../../../theme/ThemeContext";
import logoDark from "../../../../assets/logos/logo_full_dark_750x200.png";
import logoLight from "../../../../assets/logos/logo_full_light_750x200.png";
import churchImage from "../../../../assets/photos/church_image.jpg";

interface HeroContent {
  title: string;
  subtitle: string;
  description: string;
  primaryCta: { text: string; link: string };
  secondaryCta?: { text: string; link: string };
  stats: { icon: React.ReactNode; label: string; value: string }[];
}

const heroContent: HeroContent = {
  title: "Mahanaim Church of God, Telford",
  subtitle: "Where Faith Meets Fellowship",
  description: "Join us for inspiring worship, meaningful connections, and spiritual growth in the heart of Telford",
  primaryCta: { text: "Join Our Service", link: "/contact" },
  stats: [
    { icon: <CalendarToday />, label: "Service Time", value: "Sat 10:30 AM" },
    { icon: <LocationOn />, label: "Location", value: "Wellington, Telford" },
    { icon: <People />, label: "Community", value: "Growing Family" }
  ]
};

const WelcomeHero: React.FC = () => {
  const { mode } = useCustomTheme();
  const logo = mode === 'dark' ? logoLight : logoDark;

  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '85vh', md: '90vh' },
        minHeight: { xs: '500px', md: '600px' },
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        backgroundImage: `url(${churchImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: mode === 'dark'
            ? 'linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.6) 100%)'
            : 'linear-gradient(135deg, rgba(254, 252, 248, 0.92) 0%, rgba(250, 245, 235, 0.95) 100%)', // Warm cream overlay
          zIndex: 1,
        },
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          py: { xs: 4, md: 6 },
          px: { xs: 2, md: 4 }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 1.5, md: 2.5 },
            maxWidth: { xs: '100%', sm: '90%', md: '800px' },
            margin: '0 auto',
            width: '100%',
          }}
        >
          {/* Large Logo */}
          <Box
            component="img"
            src={logo}
            alt="Mahanaim Church of God"
            sx={{
              height: { xs: 60, sm: 80, md: 100, lg: 120 },
              width: 'auto',
              maxWidth: '90%',
              mb: { xs: 2, md: 3 },
              filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))',
            }}
          />

          {/* Main Title */}
          <Typography
            variant="h1"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.8rem', lg: '3.2rem' },
              lineHeight: 1.1,
              color: mode === 'dark' ? 'white' : 'black',
              textShadow: mode === 'dark' ? '0 4px 8px rgba(0, 0, 0, 0.6)' : '0 3px 6px rgba(0, 0, 0, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3)',
              mb: 2,
            }}
          >
            {heroContent.title}
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1rem', sm: '1.2rem', md: '1.4rem', lg: '1.6rem' },
              fontWeight: 400,
              color: '#f59e0b', // Golden color
              textShadow: mode === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.6)' : '0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.2)',
              mb: 3,
              fontStyle: 'italic',
            }}
          >
            {heroContent.subtitle}
          </Typography>

          {/* Description */}
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: '0.9rem', md: '1.1rem' },
              maxWidth: { xs: '100%', md: '600px' },
              lineHeight: 1.6,
              color: mode === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.85)',
              textShadow: mode === 'dark' ? '0 2px 4px rgba(0, 0, 0, 0.6)' : '0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.2)',
              mb: 4,
              fontWeight: 300,
            }}
          >
            {heroContent.description}
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 2, md: 3 }}
            sx={{ mb: { xs: 2, md: 3 } }}
          >
            <Link href={heroContent.primaryCta.link}>
              <Button
                variant="contained"
              size="large"
              endIcon={<ChevronRight />}
              sx={{
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                px: { xs: 3, md: 4 },
                py: { xs: 1.5, md: 2 },
                fontSize: { xs: '1rem', md: '1.1rem' },
                fontWeight: 600,
                borderRadius: 3,
                textTransform: 'none',
                boxShadow: '0 8px 32px rgba(245, 158, 11, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 12px 40px rgba(245, 158, 11, 0.5)',
                },
                transition: 'all 0.3s ease-in-out',
              }}
              >
                {heroContent.primaryCta.text}
              </Button>
            </Link>

            {heroContent.secondaryCta && (
              <Link href={heroContent.secondaryCta.link}>
                <Button
                  variant="outlined"
                size="large"
                sx={{
                  borderColor: 'white',
                  color: 'white',
                  borderWidth: 2,
                  px: { xs: 3, md: 4 },
                  py: { xs: 1.5, md: 2 },
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 500,
                  borderRadius: 3,
                  textTransform: 'none',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    borderColor: '#f59e0b',
                    color: '#f59e0b',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease-in-out',
                }}
                >
                  {heroContent.secondaryCta.text}
                </Button>
              </Link>
            )}
          </Stack>

          {/* Stats */}
          <Box
            sx={{
              display: 'flex',
              gap: { xs: 2, sm: 3, md: 4 },
              flexWrap: 'wrap',
              justifyContent: 'center',
              mt: { xs: 1, md: 1.5 },
            }}
          >
            {heroContent.stats.map((stat, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 1,
                  minWidth: { xs: 100, md: 120 },
                  p: { xs: 1.5, md: 2 },
                  borderRadius: 2,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  flex: 'none',
                }}
              >
                <Box sx={{ color: '#f59e0b', fontSize: '1.5rem' }}>
                  {stat.icon}
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    color: mode === 'dark' ? 'white' : 'black',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', md: '1rem' },
                    textAlign: 'center',
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: mode === 'dark' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.7)',
                    fontSize: { xs: '0.75rem', md: '0.8rem' },
                    textAlign: 'center',
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default WelcomeHero;