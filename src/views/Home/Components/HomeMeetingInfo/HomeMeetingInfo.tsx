import React from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Stack,
} from "@mui/material";
import {
  Groups,
  School,
  Group,
  Home,
  Schedule,
  CalendarToday,
} from "@mui/icons-material";
import { EditableSection } from "../../../../components/EditMode/EditableSection";

interface MeetingInfo {
  title: string;
  description: string;
  schedule: string;
  time: string;
  icon: React.ReactNode;
  color: "primary" | "secondary" | "success" | "info";
  isHighlighted?: boolean;
}

const meetings: MeetingInfo[] = [
  {
    title: "Weekly Fellowship",
    description: "Join us for worship, prayer, and community fellowship",
    schedule: "Every Saturday",
    time: "10:30 AM to 01:00 PM",
    icon: <Groups />,
    color: "primary",
    isHighlighted: true,
  },
  {
    title: "Sunday School",
    description: "Bible study and learning for all ages",
    schedule: "Every Saturday",
    time: "09:30 AM to 10:30 AM",
    icon: <School />,
    color: "secondary",
  },
  {
    title: "Young People's Endeavour",
    description: "Youth ministry and fellowship activities",
    schedule: "Every 4th Saturday",
    time: "Special Programs",
    icon: <Group />,
    color: "success",
  },
  {
    title: "Cottage Meeting",
    description: "Intimate fellowship and prayer in homes",
    schedule: "Every 1st Friday",
    time: "Evening Service",
    icon: <Home />,
    color: "info",
  },
];

const HomeMeetingInfo: React.FC = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="xl" sx={{ px: 0 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
            }}
          >
            Our Meetings
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'text.secondary',
              maxWidth: '600px',
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            Join us for worship, fellowship, and spiritual growth throughout the week
          </Typography>
        </Box>

        <Stack
          direction="row"
          flexWrap="wrap"
          spacing={3}
          sx={{
            '& > *': {
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', lg: '1 1 calc(25% - 18px)' },
              minWidth: 0,
            },
          }}
        >
          {meetings.map((meeting, index) => (
            <Box key={index}>
              <EditableSection
                sectionId={`home-meeting-${index}`}
                pageSlug="home"
                title={meeting.title}
                content={`<p><strong>${meeting.title}</strong></p><p>${meeting.description}</p><p><strong>Schedule:</strong> ${meeting.schedule}</p><p><strong>Time:</strong> ${meeting.time}</p>`}
              >
                <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  backgroundColor: meeting.isHighlighted ? `${meeting.color}.main` : 'background.paper',
                  color: meeting.isHighlighted ? 'white' : 'text.primary',
                  border: meeting.isHighlighted ? 'none' : '1px solid',
                  borderColor: meeting.isHighlighted ? 'transparent' : 'grey.200',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: meeting.isHighlighted
                      ? '0 20px 40px rgba(37, 99, 235, 0.3)'
                      : '0 20px 40px rgba(0, 0, 0, 0.1)',
                  },
                }}
              >
                <CardContent sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      mb: 2,
                    }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 0,
                        backgroundColor: meeting.isHighlighted
                          ? 'rgba(255, 255, 255, 0.2)'
                          : `${meeting.color}.main`,
                        color: meeting.isHighlighted ? 'white' : 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {meeting.icon}
                    </Box>
                    {meeting.isHighlighted && (
                      <Chip
                        label="Main Service"
                        size="small"
                        sx={{
                          backgroundColor: 'rgba(255, 255, 255, 0.2)',
                          color: 'white',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </Box>

                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      color: meeting.isHighlighted ? 'white' : 'text.primary',
                    }}
                  >
                    {meeting.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 3,
                      flexGrow: 1,
                      color: meeting.isHighlighted ? 'rgba(255, 255, 255, 0.9)' : 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {meeting.description}
                  </Typography>

                  <Stack spacing={1.5}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CalendarToday
                        sx={{
                          fontSize: 16,
                          color: meeting.isHighlighted ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: meeting.isHighlighted ? 'white' : 'text.primary',
                        }}
                      >
                        {meeting.schedule}
                      </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Schedule
                        sx={{
                          fontSize: 16,
                          color: meeting.isHighlighted ? 'rgba(255, 255, 255, 0.8)' : 'text.secondary',
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: meeting.isHighlighted ? 'white' : 'text.primary',
                        }}
                      >
                        {meeting.time}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              </EditableSection>
            </Box>
          ))}
        </Stack>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontStyle: 'italic',
            }}
          >
            All are welcome to join us for any of our services
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HomeMeetingInfo