'use client';

import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Stack, useTheme, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, CircularProgress } from "@mui/material";
import {
  Facebook,
  YouTube,
  Instagram,
  WhatsApp,
  Edit as EditIcon,
} from "@mui/icons-material";
import Link from 'next/link';
import logoLight from '../../../../assets/logos/logo_full_light_750x200.png';
import logoDark from '../../../../assets/logos/logo_full_dark_750x200.png';
import ThemeToggle from '../../../ThemeToggle/ThemeToggle';
import { useEditMode } from '../../../EditMode/EditModeProvider';

// Helper function to handle both string and StaticImageData types
const getImageSrc = (img: any): string => {
  if (typeof img === 'string') {
    return img;
  }
  return img.src || img;
};

interface SocialMediaItem {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface FooterSettings {
  facebook_url: string;
  whatsapp_url: string;
  youtube_url: string;
  instagram_url: string;
  verse_text: string;
  verse_reference: string;
}

const FooterMain: React.FC = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const { isEditMode } = useEditMode();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<FooterSettings>({
    facebook_url: '',
    whatsapp_url: '',
    youtube_url: '',
    instagram_url: '',
    verse_text: '',
    verse_reference: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<FooterSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch('/api/admin/footer-settings');
      const data = await response.json();
      if (response.ok) {
        setSettings(data);
        setFormData(data);
      }
    } catch (error) {
      console.error('Error loading footer settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage('');

    try {
      const response = await fetch('/api/admin/footer-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage('Saved successfully!');
        setMessageType('success');
        setSettings(formData);
        setTimeout(() => {
          setDialogOpen(false);
          window.location.reload();
        }, 1000);
      } else {
        setMessage('Failed to save changes');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Save error:', error);
      setMessage('Error saving changes');
      setMessageType('error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={30} />
      </Box>
    );
  }

  const socialmedia: SocialMediaItem[] = [
    {
      name: "facebook",
      url: settings.facebook_url,
      icon: <Facebook />,
    },
    {
      name: "whatsapp",
      url: settings.whatsapp_url,
      icon: <WhatsApp />,
    },
    {
      name: "youtube",
      url: settings.youtube_url,
      icon: <YouTube />,
    },
    {
      name: "instagram",
      url: settings.instagram_url,
      icon: <Instagram />,
    },
  ];

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, position: 'relative' }}>
        {isEditMode && (
          <Button
            variant="contained"
            startIcon={<EditIcon />}
            onClick={() => setDialogOpen(true)}
            size="small"
            sx={{ position: 'absolute', top: -10, right: -10, zIndex: 10 }}
          >
            Edit
          </Button>
        )}

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
              src={getImageSrc(isDark ? logoLight : logoDark)}
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
          "{settings.verse_text}"
          <br />
          - {settings.verse_reference}
        </Typography>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Footer Social Links & Verse</DialogTitle>
        <DialogContent>
          {message && (
            <Alert severity={messageType} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <Typography variant="h6" sx={{ mt: 1 }}>Social Media Links</Typography>
            <TextField
              label="Facebook URL"
              value={formData.facebook_url}
              onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
              fullWidth
            />
            <TextField
              label="WhatsApp URL"
              value={formData.whatsapp_url}
              onChange={(e) => setFormData({ ...formData, whatsapp_url: e.target.value })}
              fullWidth
            />
            <TextField
              label="YouTube URL"
              value={formData.youtube_url}
              onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
              fullWidth
            />
            <TextField
              label="Instagram URL"
              value={formData.instagram_url}
              onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
              fullWidth
            />

            <Typography variant="h6" sx={{ mt: 2 }}>Bible Verse</Typography>
            <TextField
              label="Verse Text"
              value={formData.verse_text}
              onChange={(e) => setFormData({ ...formData, verse_text: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
            <TextField
              label="Verse Reference"
              value={formData.verse_reference}
              onChange={(e) => setFormData({ ...formData, verse_reference: e.target.value })}
              fullWidth
              helperText="e.g., Hebrews 12:2"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="contained" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FooterMain;