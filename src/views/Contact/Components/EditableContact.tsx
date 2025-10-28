import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import { useEditMode } from '@/src/components/EditMode/EditModeProvider';
import ContactCard from './ContactCard';

interface Contact {
  id: number;
  title: string;
  description: string | null;
  details: string;
  iconType: string;
  actionUrl: string;
  colorTheme: string;
  orderIndex: number;
}

interface EditableContactProps {
  contact: Contact;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onUpdate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function EditableContact({
  contact,
  canMoveUp,
  canMoveDown,
  onUpdate,
  onMoveUp,
  onMoveDown,
}: EditableContactProps) {
  const { isEditMode } = useEditMode();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: contact.title,
    description: contact.description || '',
    details: contact.details,
    iconType: contact.iconType,
    colorTheme: contact.colorTheme,
  });

  const handleEdit = () => {
    setFormData({
      title: contact.title,
      description: contact.description || '',
      details: contact.details,
      iconType: contact.iconType,
      colorTheme: contact.colorTheme,
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${contact.title}?`)) return;

    try {
      const response = await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onUpdate();
      } else {
        alert('Failed to delete contact');
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      alert('Failed to delete contact');
    }
  };

  const generateActionUrl = (iconType: string, details: string): string => {
    switch (iconType) {
      case 'email':
        return `mailto:${details}`;
      case 'phone':
        return `tel:${details.replace(/\s/g, '')}`;
      case 'whatsapp':
        const phoneNumber = details.replace(/\s/g, '').replace('+', '');
        return `https://api.whatsapp.com/send/?phone=${phoneNumber}&text&app_absent=0`;
      case 'facebook':
      case 'website':
      case 'location':
        return details.startsWith('http') ? details : `https://${details}`;
      default:
        return details;
    }
  };

  const handleSubmit = async () => {
    try {
      const actionUrl = generateActionUrl(formData.iconType, formData.details);

      const response = await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          details: formData.details,
          icon_type: formData.iconType,
          action_url: actionUrl,
          color_theme: formData.colorTheme,
          order_index: contact.orderIndex,
        }),
      });

      if (response.ok) {
        setDialogOpen(false);
        onUpdate();
      } else {
        alert('Failed to update contact');
      }
    } catch (error) {
      console.error('Error updating contact:', error);
      alert('Failed to update contact');
    }
  };

  return (
    <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
      {isEditMode && (
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 10,
            display: 'flex',
            gap: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 2,
            p: 0.5,
            boxShadow: 2,
          }}
        >
          <IconButton size="small" onClick={onMoveUp} disabled={!canMoveUp} color="primary">
            <ArrowUpward fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={onMoveDown} disabled={!canMoveDown} color="primary">
            <ArrowDownward fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleEdit} color="primary">
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton size="small" onClick={handleDelete} color="error">
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      )}

      <ContactCard
        title={contact.title}
        description={contact.description}
        details={contact.details}
        iconType={contact.iconType}
        actionUrl={contact.actionUrl}
        colorTheme={contact.colorTheme}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Contact</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              fullWidth
              helperText="e.g., Email, Call, WhatsApp"
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              fullWidth
              helperText="Optional: e.g., person's name"
            />
            <FormControl fullWidth>
              <InputLabel>Icon Type</InputLabel>
              <Select
                value={formData.iconType}
                label="Icon Type"
                onChange={(e) => setFormData({ ...formData, iconType: e.target.value })}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="phone">Phone</MenuItem>
                <MenuItem value="whatsapp">WhatsApp</MenuItem>
                <MenuItem value="location">Location</MenuItem>
                <MenuItem value="facebook">Facebook</MenuItem>
                <MenuItem value="website">Website</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Details"
              value={formData.details}
              onChange={(e) => setFormData({ ...formData, details: e.target.value })}
              required
              fullWidth
              helperText={
                formData.iconType === 'email'
                  ? 'Email address (e.g., church@example.com)'
                  : formData.iconType === 'phone' || formData.iconType === 'whatsapp'
                  ? 'Phone number (e.g., +44 7411 539877)'
                  : 'Full URL (e.g., https://example.com)'
              }
            />
            <FormControl fullWidth>
              <InputLabel>Color Theme</InputLabel>
              <Select
                value={formData.colorTheme}
                label="Color Theme"
                onChange={(e) => setFormData({ ...formData, colorTheme: e.target.value })}
              >
                <MenuItem value="primary">Primary (Blue)</MenuItem>
                <MenuItem value="secondary">Secondary (Purple)</MenuItem>
                <MenuItem value="success">Success (Green)</MenuItem>
                <MenuItem value="info">Info (Light Blue)</MenuItem>
                <MenuItem value="warning">Warning (Orange)</MenuItem>
                <MenuItem value="error">Error (Red)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.title || !formData.details}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
