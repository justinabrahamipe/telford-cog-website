import React, { useState, useEffect } from "react";
import { Container, Typography, Box, CircularProgress, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { Add as AddIcon, CloudUpload as UploadIcon } from "@mui/icons-material";
import { useEditMode } from "@/src/components/EditMode/EditModeProvider";
import { EditableLeader } from "./EditableLeader";

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

const LeadersList: React.FC = () => {
  const { isEditMode } = useEditMode();
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    imageUrl: '',
    type: 'official',
    facebookUrl: '',
    whatsappUrl: '',
  });

  useEffect(() => {
    loadLeaders();
  }, []);

  const loadLeaders = async () => {
    try {
      const response = await fetch('/api/admin/leaders');
      const data = await response.json();
      if (response.ok) {
        setLeaders(data.leaders || []);
      }
    } catch (error) {
      console.error('Error loading leaders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLeader = () => {
    const maxOrder = Math.max(...leaders.map(l => l.orderIndex), -1);
    setFormData({
      name: '',
      designation: '',
      description: '',
      imageUrl: '',
      type: 'official',
      facebookUrl: '',
      whatsappUrl: '',
    });
    setDialogOpen(true);
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
      const response = await fetch('/api/admin/leaders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          designation: formData.designation,
          description: formData.description || null,
          image_url: formData.imageUrl || null,
          type: formData.type,
          order_index: Math.max(...leaders.map(l => l.orderIndex), -1) + 1,
          facebook_url: formData.facebookUrl || null,
          whatsapp_url: formData.whatsappUrl || null,
        }),
      });

      if (response.ok) {
        setDialogOpen(false);
        loadLeaders();
      } else {
        alert('Failed to add leader');
      }
    } catch (error) {
      console.error('Error adding leader:', error);
      alert('Failed to add leader');
    }
  };

  const handleMoveUp = async (leader: Leader, filteredLeaders: Leader[]) => {
    const index = filteredLeaders.findIndex(l => l.id === leader.id);
    if (index === 0) return;

    const prevLeader = filteredLeaders[index - 1];

    try {
      await fetch(`/api/admin/leaders/${leader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leader, order_index: prevLeader.orderIndex }),
      });

      await fetch(`/api/admin/leaders/${prevLeader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...prevLeader, order_index: leader.orderIndex }),
      });

      loadLeaders();
    } catch (error) {
      alert('Failed to reorder leaders');
    }
  };

  const handleMoveDown = async (leader: Leader, filteredLeaders: Leader[]) => {
    const index = filteredLeaders.findIndex(l => l.id === leader.id);
    if (index === filteredLeaders.length - 1) return;

    const nextLeader = filteredLeaders[index + 1];

    try {
      await fetch(`/api/admin/leaders/${leader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leader, order_index: nextLeader.orderIndex }),
      });

      await fetch(`/api/admin/leaders/${nextLeader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nextLeader, order_index: leader.orderIndex }),
      });

      loadLeaders();
    } catch (error) {
      alert('Failed to reorder leaders');
    }
  };

  if (loading) {
    return (
      <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 3, md: 4 }, py: { xs: 4, md: 6 }, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  const mainLeaders = leaders.filter(l => l.type === 'main');
  const officials = leaders.filter(l => l.type === 'official');

  return (
    <Container maxWidth="xl" sx={{ px: { xs: 2, sm: 2, md: 3 }, py: { xs: 2, md: 3 } }}>
      {isEditMode && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddLeader}
            size="large"
          >
            Add New Leader
          </Button>
        </Box>
      )}

      {mainLeaders.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 1.5, md: 2 },
            mb: 3,
            justifyContent: 'center',
            alignItems: 'stretch',
            '& > *': {
              flex: {
                xs: '0 0 100%',
                sm: '0 0 calc(50% - 8px)',
                md: '0 0 calc(33.333% - 11px)',
                lg: '0 0 calc(25% - 12px)',
              },
              maxWidth: {
                xs: '100%',
                sm: 'calc(50% - 8px)',
                md: 'calc(33.333% - 11px)',
                lg: 'calc(25% - 12px)',
              },
              minHeight: '320px',
            },
          }}
        >
          {mainLeaders.map((leader, index) => (
            <EditableLeader
              key={leader.id}
              leader={leader}
              index={index}
              canMoveUp={index > 0}
              canMoveDown={index < mainLeaders.length - 1}
              onUpdate={loadLeaders}
              onMoveUp={() => handleMoveUp(leader, mainLeaders)}
              onMoveDown={() => handleMoveDown(leader, mainLeaders)}
            />
          ))}
        </Box>
      )}

      {officials.length > 0 && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 700,
                color: 'text.primary',
                textAlign: 'center',
                mb: 2,
                mt: 2,
                fontSize: { xs: '1.4rem', md: '1.75rem' },
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-6px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '50px',
                  height: '3px',
                  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
                  borderRadius: '2px',
                },
              }}
            >
              Our Officials
            </Typography>
          </motion.div>

          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: { xs: 1.5, md: 2 },
              justifyContent: 'center',
              alignItems: 'stretch',
              '& > *': {
                flex: {
                  xs: '0 0 100%',
                  sm: '0 0 calc(50% - 8px)',
                  md: '0 0 calc(33.333% - 11px)',
                  lg: '0 0 calc(25% - 12px)',
                },
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 8px)',
                  md: 'calc(33.333% - 11px)',
                  lg: 'calc(25% - 12px)',
                },
                minHeight: '240px',
              },
            }}
          >
            {officials.map((leader, index) => (
              <EditableLeader
                key={leader.id}
                leader={leader}
                index={mainLeaders.length + index}
                canMoveUp={index > 0}
                canMoveDown={index < officials.length - 1}
                onUpdate={loadLeaders}
                onMoveUp={() => handleMoveUp(leader, officials)}
                onMoveDown={() => handleMoveDown(leader, officials)}
              />
            ))}
          </Box>
        </>
      )}

      {leaders.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No leaders have been added yet.
          </Typography>
        </Box>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add New Leader</DialogTitle>
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
                id="image-upload-new"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="image-upload-new">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={uploading ? <CircularProgress size={20} /> : <UploadIcon />}
                  disabled={uploading}
                  fullWidth
                >
                  {uploading ? 'Uploading...' : 'Upload Image (Optional)'}
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
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default LeadersList;