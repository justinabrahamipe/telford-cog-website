import React from "react";
import Link from "next/link";
import { Box, Typography, Card } from "@mui/material";
import bibleIcon from "../../../../assets/icons/bible-icon-color.png";
import churchIcon from "../../../../assets/icons/church-icon-color.png";
import pulpitIcon from "../../../../assets/icons/pulpit-icon-color.png";

interface HomeAboutGridItemProps {
  title: string;
  icon: string;
  to: string;
}

const iconMap = {
  beliefs: bibleIcon,
  ministries: churchIcon,
  leadership: pulpitIcon,
};

const HomeAboutGridItem: React.FC<HomeAboutGridItemProps> = ({ title, icon, to }) => {
  return (
    <Link href={to} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 300,
        minWidth: 300,
        m: 1,
        p: 3,
        backgroundColor: 'background.paper',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'all 0.25s ease-in-out',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-4px)',
          '& .icon-img': {
            transform: 'scale(1.0)',
            filter: 'grayscale(1)',
            opacity: 0.35,
          },
          '& .title-text': {
            color: 'primary.main',
          },
          '&::after': {
            width: '100%',
            opacity: 1,
          },
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '0%',
          height: 2,
          backgroundColor: 'primary.main',
          opacity: 0,
          transition: 'all 0.25s ease-in-out',
        },
      }}
    >
      <Box
        component="img"
        src={iconMap[icon as keyof typeof iconMap]}
        alt={`${title} icon`}
        className="icon-img"
        sx={{
          width: 150,
          height: 150,
          objectFit: 'cover',
          transform: 'scale(0.9)',
          filter: 'grayscale(0) saturate(1.15)',
          opacity: 1,
          transition: 'all 0.25s ease-in-out',
          mb: 3,
        }}
      />
      <Typography
        variant="h5"
        className="title-text"
        sx={{
          color: 'text.primary',
          fontFamily: '"Inter", sans-serif',
          fontWeight: 400,
          letterSpacing: 0.25,
          textAlign: 'center',
          transition: 'color 0.25s ease-in-out',
        }}
      >
        {title}
      </Typography>
      </Card>
    </Link>
  );
};

export default HomeAboutGridItem;