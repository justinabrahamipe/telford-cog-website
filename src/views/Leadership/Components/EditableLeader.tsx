import React, { useState } from 'react';
import { Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, FormControl, InputLabel, Select, MenuItem, CircularProgress } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, ArrowUpward, ArrowDownward, CloudUpload as UploadIcon } from '@mui/icons-material';
import { useEditMode } from '@/src/components/EditMode/EditModeProvider';
import LeaderItem from './LeaderItem';

interface Leader {
  id: number;
  name: string;
  designation: string;
  description: string | null;
  imageUrl: string | null;
  type: string;
  orderIndex: number;
  facebookUrl: string | null;
  whatsappUrl: string | null;
}

interface EditableLeaderProps {
  leader: Leader;
  index: number;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onUpdate: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export function EditableLeader({
  leader,
  index,
  canMoveUp,
  canMoveDown,
  onUpdate,
  onMoveUp,
  onMoveDown,
}: EditableLeaderProps) {
  const { isEditMode } = useEditMode();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: leader.name,
    designation: leader.designation,
    description: leader.description || '',
    imageUrl: leader.imageUrl || '',
    type: leader.type,
    facebookUrl: leader.facebookUrl || '',
    whatsappUrl: leader.whatsappUrl || '',
  });

  const handleEdit = () => {
    setFormData({
      name: leader.name,
      designation: leader.designation,
      description: leader.description || '',
      imageUrl: leader.imageUrl || '',
      type: leader.type,
      facebookUrl: leader.facebookUrl || '',
      whatsappUrl: leader.whatsappUrl || '',
    });
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete ${leader.name}?`)) return;

    try {
      const response = await fetch(`/api/admin/leaders/${leader.id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        onUpdate();
      } else {
        alert('Failed to delete leader');
      }
    } catch (error) {
      console.error('Error deleting leader:', error);
      alert('Failed to delete leader');
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);

    try {
      const response = await fetch('/api/admin/leaders/upload', {
        method: 'POST',
        body: uploadFormData,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, imageUrl: data.url }));
      } else {
        alert('Failed to upload image');
      }
    } catch (error) {
      alert('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(`/api/admin/leaders/${leader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          designation: formData.designation,
          description: formData.description || null,
          image_url: formData.imageUrl || null,
          type: formData.type,
          order_index: leader.orderIndex,
          facebook_url: formData.facebookUrl || null,
          whatsapp_url: formData.whatsappUrl || null,
        }),
      });

      if (response.ok) {
        setDialogOpen(false);
        onUpdate();
      } else {
        alert('Failed to update leader');
      }
    } catch (error) {
      console.error('Error updating leader:', error);
      alert('Failed to update leader');
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

      <LeaderItem
        image={leader.imageUrl || undefined}
        name={leader.name}
        designation={leader.designation}
        description={leader.description || undefined}
        socialMedia={!!(leader.facebookUrl || leader.whatsappUrl)}
        fb={leader.facebookUrl || undefined}
        wa={leader.whatsappUrl || undefined}
        index={index}
      />

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Leader</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Designation"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              required
              fullWidth
            />
            <TextField
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={4}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="main">Main Leader</MenuItem>
                <MenuItem value="official">Official</MenuItem>
              </Select>
            </FormControl>
            <Box>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id={`image-upload-${leader.id}`}
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor={`image-upload-${leader.id}`}>
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                  disabled={uploading}
                  fullWidth
                >
                  {uploading ? 'Uploading...' : 'Change Image'}
                </Button>
              </label>
              {formData.imageUrl && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Box
                    component="img"
                    src={formData.imageUrl}
                    alt="Preview"
                    sx={{ width: 120, height: 120, borderRadius: '50%', objectFit: 'cover' }}
                  />
                </Box>
              )}
            </Box>
            <TextField
              label="Facebook URL"
              value={formData.facebookUrl}
              onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
              placeholder="https://facebook.com/..."
              fullWidth
            />
            <TextField
              label="WhatsApp URL"
              value={formData.whatsappUrl}
              onChange={(e) => setFormData({ ...formData, whatsappUrl: e.target.value })}
              placeholder="https://wa.me/..."
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.designation}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
