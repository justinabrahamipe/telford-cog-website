import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Box,
  Stack,
} from "@mui/material";
import { Facebook, WhatsApp } from "@mui/icons-material";
import { StaticImageData } from "next/image";

interface LeaderItemProps {
  image?: StaticImageData;
  name: string;
  designation: string | React.ReactNode;
  description?: string;
  socialMedia: boolean;
  fb?: string;
  wa?: string;
}

const LeaderItem: React.FC<LeaderItemProps> = ({
  image,
  name,
  designation,
  description,
  socialMedia,
  fb,
  wa,
}) => (
  <Card
    sx={{
      maxWidth: 400,
      width: '100%',
      m: 1,
      borderRadius: 0,
      boxShadow: 3,
      '&:hover': {
        boxShadow: 6,
      },
    }}
  >
    <CardContent sx={{ p: 3 }}>
      {image && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
          <Avatar
            src={image.src}
            alt={name}
            sx={{
              width: 150,
              height: 150,
              border: '3px solid',
              borderColor: 'primary.main',
            }}
          />
        </Box>
      )}
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          color: 'text.primary',
          mb: 1,
          textAlign: 'center',
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: 'primary.main',
          fontWeight: 500,
          mb: 2,
          textAlign: 'center',
        }}
      >
        {designation}
      </Typography>
      {description && (
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.6,
            textAlign: 'justify',
          }}
        >
          {description}
        </Typography>
      )}
    </CardContent>
    {socialMedia && (fb || wa) && (
      <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
        <Stack direction="row" spacing={1}>
          {fb && (
            <Button
              variant="outlined"
              startIcon={<Facebook />}
              href={fb}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: 0,
                color: 'primary.main',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                },
              }}
            >
              Facebook
            </Button>
          )}
          {wa && (
            <Button
              variant="outlined"
              startIcon={<WhatsApp />}
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                borderRadius: 0,
                color: 'success.main',
                borderColor: 'success.main',
                '&:hover': {
                  backgroundColor: 'success.main',
                  color: 'white',
                },
              }}
            >
              WhatsApp
            </Button>
          )}
        </Stack>
      </CardActions>
    )}
  </Card>
);

export default LeaderItem;