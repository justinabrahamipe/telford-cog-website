import React from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Card,
  CardContent,
  Avatar,
  Chip,
} from "@mui/material";
import { FormatQuote, Person } from "@mui/icons-material";
import pastorPhoto from "../../../../assets/photos/Photos/pr_biju_cherian_home.jpg";
import { EditableSection } from "../../../../components/EditMode/EditableSection";

const HomeGreetings: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
        >
          {/* Pastor Card */}
          <Box sx={{ flex: { xs: '1', md: '0 0 33%' } }}>
            <Card
              sx={{
                position: 'relative',
                overflow: 'visible',
                backgroundColor: 'transparent',
                boxShadow: 'none',
                textAlign: 'center',
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  display: 'inline-block',
                  mb: 3,
                }}
              >
                <Avatar
                  src={pastorPhoto.src}
                  alt="Pr. Biju Cherian"
                  sx={{
                    width: { xs: 180, md: 220 },
                    height: { xs: 180, md: 220 },
                    border: '6px solid',
                    borderColor: 'primary.main',
                    boxShadow: '0 12px 40px rgba(37, 99, 235, 0.2)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.05)',
                      boxShadow: '0 16px 50px rgba(37, 99, 235, 0.3)',
                    },
                  }}
                />
                <Chip
                  icon={<Person />}
                  label="Senior Pastor"
                  color="primary"
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontWeight: 600,
                    boxShadow: 2,
                  }}
                />
              </Box>
              <CardContent sx={{ px: 0 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    color: 'text.primary',
                    mb: 1,
                  }}
                >
                  Pr. Biju Cherian
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.secondary',
                    fontStyle: 'italic',
                  }}
                >
                  "Serving with love and dedication"
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Greeting Message */}
          <Box sx={{ flex: { xs: '1', md: '0 0 67%' } }}>
            <EditableSection
              sectionId="home-greetings"
              pageSlug="home"
              title="Greetings"
              content="<p>I am glad you are here to know about our church.</p><p>I wholeheartedly welcome you to attend our worship service and experience the touch and power of God.</p><p>Thank you and God bless you.</p>"
            >
              <Box
                sx={{
                  position: 'relative',
                  pl: { xs: 0, md: 4 },
                }}
              >
                <FormatQuote
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: { xs: -10, md: 16 },
                    fontSize: 60,
                    color: 'primary.main',
                    opacity: 0.2,
                    transform: 'rotate(180deg)',
                  }}
                />

                <Typography
                  variant="h3"
                  sx={{
                    fontFamily: '"Playfair Display", serif',
                    fontWeight: 600,
                    color: 'primary.main',
                    mb: 3,
                    position: 'relative',
                  }}
                >
                  Greetings
                </Typography>

                <Box sx={{ position: 'relative', zIndex: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.125rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                      mb: 3,
                    }}
                  >
                    I am glad you are here to know about our church.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.125rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                      mb: 3,
                    }}
                  >
                    I wholeheartedly welcome you to attend our worship service and
                    experience the touch and power of God.
                  </Typography>

                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: '1.125rem',
                      lineHeight: 1.8,
                      color: 'text.primary',
                      fontWeight: 500,
                    }}
                  >
                    Thank you and God bless you.
                  </Typography>

                  <Box
                    sx={{
                      mt: 4,
                      pt: 3,
                      borderTop: '2px solid',
                      borderColor: 'primary.main',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontFamily: '"Playfair Display", serif',
                        fontStyle: 'italic',
                        color: 'text.secondary',
                      }}
                    >
                      "Come as you are, leave changed by His grace"
                    </Typography>
                  </Box>
                </Box>

                <FormatQuote
                  sx={{
                    position: 'absolute',
                    bottom: -10,
                    right: -10,
                    fontSize: 60,
                    color: 'primary.main',
                    opacity: 0.2,
                  }}
                />
              </Box>
            </EditableSection>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default HomeGreetings;