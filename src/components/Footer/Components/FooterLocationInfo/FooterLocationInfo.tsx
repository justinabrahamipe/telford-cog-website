'use client';

import React, { useState, useEffect } from "react";
import { Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Alert, CircularProgress, IconButton } from "@mui/material";
import { LocationOn, OpenInNew, Edit as EditIcon } from "@mui/icons-material";
import { useEditMode } from '../../../EditMode/EditModeProvider';

interface LocationSettings {
  address_line1: string;
  address_line2: string;
  address_line3: string;
  address_line4: string;
  google_maps_url: string;
  google_maps_embed_url: string;
}

const FooterLocationInfo: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<LocationSettings>({
    address_line1: '',
    address_line2: '',
    address_line3: '',
    address_line4: '',
    google_maps_url: '',
    google_maps_embed_url: '',
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState<LocationSettings>(settings);
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
        const locationData: LocationSettings = {
          address_line1: data.address_line1 || '',
          address_line2: data.address_line2 || '',
          address_line3: data.address_line3 || '',
          address_line4: data.address_line4 || '',
          google_maps_url: data.google_maps_url || '',
          google_maps_embed_url: data.google_maps_embed_url || '',
        };
        setSettings(locationData);
        setFormData(locationData);
      }
    } catch (error) {
      console.error('Error loading location settings:', error);
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

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: { xs: 'center', md: 'flex-start' }, textAlign: { xs: 'center', md: 'left' }, position: 'relative' }}>
        {isEditMode && (
          <IconButton
            onClick={() => setDialogOpen(true)}
            size="small"
            sx={{
              position: 'absolute',
              top: -10,
              right: -10,
              backgroundColor: 'primary.main',
              color: 'white',
              '&:hover': {
                backgroundColor: 'primary.dark',
              },
              zIndex: 10,
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        )}

        <Typography
          variant="h6"
          sx={{
            color: 'text.primary',
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <LocationOn color="secondary" />
          Our Address
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            lineHeight: 1.8,
            mb: 2,
          }}
        >
          {settings.address_line1}
          <br />
          {settings.address_line2}
          <br />
          {settings.address_line3}
          <br />
          {settings.address_line4}
        </Typography>

        <Button
          variant="outlined"
          size="small"
          href={settings.google_maps_url}
          target="_blank"
          rel="noopener noreferrer"
          endIcon={<OpenInNew />}
          sx={{
            color: 'secondary.main',
            borderColor: 'secondary.main',
            textTransform: 'none',
            alignSelf: { xs: 'center', md: 'flex-start' },
            '&:hover': {
              borderColor: 'secondary.light',
              backgroundColor: 'rgba(245, 158, 11, 0.1)',
              transform: 'translateY(-1px)',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          View on Map
        </Button>
      </Box>

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Location & Map</DialogTitle>
        <DialogContent>
          {message && (
            <Alert severity={messageType} sx={{ mb: 2 }}>
              {message}
            </Alert>
          )}

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Address Line 1"
              value={formData.address_line1}
              onChange={(e) => setFormData({ ...formData, address_line1: e.target.value })}
              fullWidth
              helperText="e.g., All Saints Parish Center,"
            />
            <TextField
              label="Address Line 2"
              value={formData.address_line2}
              onChange={(e) => setFormData({ ...formData, address_line2: e.target.value })}
              fullWidth
              helperText="e.g., Lychgate Walk, Wellington,"
            />
            <TextField
              label="Address Line 3"
              value={formData.address_line3}
              onChange={(e) => setFormData({ ...formData, address_line3: e.target.value })}
              fullWidth
              helperText="e.g., Telford - TF1 3HA"
            />
            <TextField
              label="Address Line 4"
              value={formData.address_line4}
              onChange={(e) => setFormData({ ...formData, address_line4: e.target.value })}
              fullWidth
              helperText="e.g., United Kingdom"
            />
            <TextField
              label="Google Maps URL"
              value={formData.google_maps_url}
              onChange={(e) => setFormData({ ...formData, google_maps_url: e.target.value })}
              fullWidth
              helperText="Link for 'View on Map' button (e.g., https://goo.gl/maps/...)"
            />
            <TextField
              label="Google Maps Embed URL"
              value={formData.google_maps_embed_url}
              onChange={(e) => setFormData({ ...formData, google_maps_embed_url: e.target.value })}
              fullWidth
              multiline
              rows={3}
              helperText="Paste the full iframe HTML or just the URL from Google Maps > Share > Embed a map"
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

export default FooterLocationInfo;