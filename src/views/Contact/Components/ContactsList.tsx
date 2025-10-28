import React, { useState, useEffect } from "react";
import { Container, Box, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useEditMode } from "@/src/components/EditMode/EditModeProvider";
import { EditableContact } from "./EditableContact";

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

const ContactsList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    details: '',
    iconType: 'email',
    colorTheme: 'primary',
  });

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts');
      const data = await response.json();
      if (response.ok) {
        setContacts(data.contacts || []);
      }
    } catch (error) {
      console.error('Error loading contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddContact = () => {
    setFormData({
      title: '',
      description: '',
      details: '',
      iconType: 'email',
      colorTheme: 'primary',
    });
    setDialogOpen(true);
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

      const response = await fetch('/api/admin/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description || null,
          details: formData.details,
          icon_type: formData.iconType,
          action_url: actionUrl,
          color_theme: formData.colorTheme,
          order_index: Math.max(...contacts.map(c => c.orderIndex), -1) + 1,
        }),
      });

      if (response.ok) {
        setDialogOpen(false);
        loadContacts();
      } else {
        alert('Failed to add contact');
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      alert('Failed to add contact');
    }
  };

  const handleMoveUp = async (contact: Contact) => {
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index === 0) return;

    const prevContact = contacts[index - 1];

    try {
      await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, order_index: prevContact.orderIndex }),
      });

      await fetch(`/api/admin/contacts/${prevContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...prevContact, order_index: contact.orderIndex }),
      });

      loadContacts();
    } catch (error) {
      alert('Failed to reorder contacts');
    }
  };

  const handleMoveDown = async (contact: Contact) => {
    const index = contacts.findIndex(c => c.id === contact.id);
    if (index === contacts.length - 1) return;

    const nextContact = contacts[index + 1];

    try {
      await fetch(`/api/admin/contacts/${contact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contact, order_index: nextContact.orderIndex }),
      });

      await fetch(`/api/admin/contacts/${nextContact.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nextContact, order_index: contact.orderIndex }),
      });

      loadContacts();
    } catch (error) {
      alert('Failed to reorder contacts');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 6, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {isEditMode && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddContact}
            size="large"
          >
            Add New Contact Method
          </Button>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 4,
          justifyContent: 'center',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        {contacts.map((contact, index) => (
          <Box key={contact.id} sx={{ flex: '0 0 300px' }}>
            <EditableContact
              contact={contact}
              canMoveUp={index > 0}
              canMoveDown={index < contacts.length - 1}
              onUpdate={loadContacts}
              onMoveUp={() => handleMoveUp(contact)}
              onMoveDown={() => handleMoveDown(contact)}
            />
          </Box>
        ))}
      </Box>

      {contacts.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No contact methods have been added yet.
          </Typography>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Contact Method</DialogTitle>
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ContactsList;
