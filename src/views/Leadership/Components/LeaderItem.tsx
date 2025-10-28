import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Avatar,
  Box,
  Stack,
  Drawer,
  IconButton,
} from "@mui/material";
import { Facebook, WhatsApp, Close as CloseIcon } from "@mui/icons-material";
import { motion } from "framer-motion";

interface LeaderItemProps {
  image?: string;
  name: string;
  designation: string | React.ReactNode;
  description?: string;
  socialMedia: boolean;
  fb?: string;
  wa?: string;
  index?: number;
}

const LeaderItem: React.FC<LeaderItemProps> = ({
  image,
  name,
  designation,
  description,
  socialMedia,
  fb,
  wa,
  index = 0,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ width: '100%', height: '100%' }}
    >
      <Card
        sx={{
          height: description ? '320px' : '240px',
          m: 0.5,
          borderRadius: 3,
          boxShadow: (theme) => theme.palette.mode === 'dark'
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 4px 20px rgba(0,0,0,0.08)',
          overflow: 'hidden',
          position: 'relative',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          background: (theme) => theme.palette.mode === 'dark'
            ? 'linear-gradient(to bottom, #1e1e1e 0%, #2a2a2a 100%)'
            : 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            boxShadow: (theme) => theme.palette.mode === 'dark'
              ? '0 12px 40px rgba(0,0,0,0.6)'
              : '0 12px 40px rgba(0,0,0,0.15)',
            transform: 'translateY(-8px)',
          },
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
            transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        }}
      >
    <CardContent sx={{ p: 2, pt: 2.5, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {image ? (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Box
              sx={{
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  inset: '-8px',
                  borderRadius: '50%',
                  padding: '4px',
                  background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'opacity 0.3s',
                },
              }}
            >
              <Box
                component="img"
                src={image}
                alt={name}
                sx={{
                  width: 90,
                  height: 90,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '3px solid white',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                  transition: 'transform 0.3s',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                }}
              />
            </Box>
          </Box>
        </motion.div>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              bgcolor: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              background: 'linear-gradient(135deg, #1976d2 0%, #42a5f5 100%)',
              fontSize: '2rem',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
            }}
          >
            {name.charAt(0)}
          </Avatar>
        </Box>
      )}
      <Typography
        variant="h5"
        component="h3"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 700,
          color: 'text.primary',
          mb: 0.75,
          textAlign: 'center',
          fontSize: description ? { xs: '1.25rem', md: '1.35rem' } : { xs: '1.1rem', md: '1.2rem' },
          letterSpacing: '-0.02em',
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: 'primary.main',
          fontWeight: 600,
          mb: 0,
          textAlign: 'center',
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
      >
        {designation}
      </Typography>
    </CardContent>
    {(description || (socialMedia && (fb || wa))) && (
      <CardActions sx={{ justifyContent: 'center', pb: 1.5, pt: 0, mt: 'auto' }}>
        <Button
          size="small"
          onClick={() => setIsExpanded(true)}
          sx={{
            textTransform: 'none',
            fontWeight: 600,
            fontSize: '0.8rem',
            color: 'primary.main',
          }}
        >
          See More
        </Button>
      </CardActions>
    )}
      </Card>

      {/* Side Panel Drawer */}
      <Drawer
        anchor="right"
        open={isExpanded}
        onClose={() => setIsExpanded(false)}
        sx={{
          '& .MuiDrawer-paper': {
            width: { xs: '100%', sm: 400, md: 500 },
            p: 3,
          },
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <IconButton
            onClick={() => setIsExpanded(false)}
            sx={{
              position: 'absolute',
              right: -8,
              top: -8,
            }}
          >
            <CloseIcon />
          </IconButton>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3, mt: 2 }}>
            {image ? (
              <Box
                component="img"
                src={image}
                alt={name}
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid',
                  borderColor: 'primary.main',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  mb: 2,
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 150,
                  height: 150,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  fontWeight: 600,
                  mb: 2,
                }}
              >
                {name.charAt(0)}
              </Avatar>
            )}

            <Typography
              variant="h4"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
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
                fontWeight: 600,
                textAlign: 'center',
                fontSize: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {designation}
            </Typography>
          </Box>

          {description && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  lineHeight: 1.8,
                  textAlign: 'justify',
                  fontSize: '1rem',
                }}
              >
                {description}
              </Typography>
            </Box>
          )}

          {socialMedia && (fb || wa) && (
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              {fb && (
                <Button
                  variant="contained"
                  startIcon={<Facebook />}
                  href={fb}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(135deg, #1877f2 0%, #0d5dbf 100%)',
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(24, 119, 242, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #0d5dbf 0%, #1877f2 100%)',
                      boxShadow: '0 6px 20px rgba(24, 119, 242, 0.4)',
                    },
                  }}
                >
                  Facebook
                </Button>
              )}
              {wa && (
                <Button
                  variant="contained"
                  startIcon={<WhatsApp />}
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    background: 'linear-gradient(135deg, #25d366 0%, #1ea952 100%)',
                    color: 'white',
                    fontWeight: 600,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #1ea952 0%, #25d366 100%)',
                      boxShadow: '0 6px 20px rgba(37, 211, 102, 0.4)',
                    },
                  }}
                >
                  WhatsApp
                </Button>
              )}
            </Box>
          )}
        </Box>
      </Drawer>
    </motion.div>
  );
};

export default LeaderItem;