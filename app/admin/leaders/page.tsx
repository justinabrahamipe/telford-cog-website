'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  CardActions,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  IconButton,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Stack,
  Tabs,
  Tab,
} from '@mui/material';
import {
  ArrowBack,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CloudUpload as UploadIcon,
  DragIndicator,
  ArrowUpward,
  ArrowDownward,
} from '@mui/icons-material';

interface Leader {
  id: number;
  name: string;
  designation: string;
  description: string | null;
  image_url: string | null;
  type: string;
  order_index: number;
  facebook_url: string | null;
  whatsapp_url: string | null;
}

export default function AdminLeadersManager() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingLeader, setEditingLeader] = useState<Leader | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    image_url: '',
    type: 'official',
    order_index: 0,
    facebook_url: '',
    whatsapp_url: '',
  });
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();

      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setLoading(false);
        loadLeaders();
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const loadLeaders = async () => {
    try {
      const response = await fetch('/api/admin/leaders');
      const data = await response.json();

      if (response.ok) {
        setLeaders(data.leaders || []);
      }
    } catch (error) {
      console.error('Error loading leaders:', error);
      setMessage('Failed to load leaders');
      setMessageType('error');
    }
  };

  const handleOpenDialog = (leader?: Leader) => {
    if (leader) {
      setEditingLeader(leader);
      setFormData({
        name: leader.name,
        designation: leader.designation,
        description: leader.description || '',
        image_url: leader.image_url || '',
        type: leader.type,
        order_index: leader.order_index,
        facebook_url: leader.facebook_url || '',
        whatsapp_url: leader.whatsapp_url || '',
      });
    } else {
      setEditingLeader(null);
      const maxOrder = Math.max(...leaders.map(l => l.order_index), -1);
      setFormData({
        name: '',
        designation: '',
        description: '',
        image_url: '',
        type: currentTab === 0 ? 'main' : 'official',
        order_index: maxOrder + 1,
        facebook_url: '',
        whatsapp_url: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingLeader(null);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/leaders/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setFormData(prev => ({ ...prev, image_url: data.url }));
        setMessage('Image uploaded successfully');
        setMessageType('success');
      } else {
        setMessage(data.error || 'Failed to upload image');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to upload image');
      setMessageType('error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const url = editingLeader
        ? `/api/admin/leaders/${editingLeader.id}`
        : '/api/admin/leaders';
      const method = editingLeader ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(editingLeader ? 'Leader updated successfully' : 'Leader added successfully');
        setMessageType('success');
        handleCloseDialog();
        loadLeaders();
      } else {
        setMessage(data.error || 'Failed to save leader');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to save leader');
      setMessageType('error');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this leader?')) return;

    try {
      const response = await fetch(`/api/admin/leaders/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Leader deleted successfully');
        setMessageType('success');
        loadLeaders();
      } else {
        setMessage('Failed to delete leader');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Failed to delete leader');
      setMessageType('error');
    }
  };

  const handleMoveUp = async (leader: Leader, index: number) => {
    if (index === 0) return;

    const filteredLeaders = leaders.filter(l => l.type === leader.type);
    const prevLeader = filteredLeaders[index - 1];

    try {
      await fetch(`/api/admin/leaders/${leader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leader, order_index: prevLeader.order_index }),
      });

      await fetch(`/api/admin/leaders/${prevLeader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...prevLeader, order_index: leader.order_index }),
      });

      loadLeaders();
    } catch (error) {
      setMessage('Failed to reorder leaders');
      setMessageType('error');
    }
  };

  const handleMoveDown = async (leader: Leader, index: number) => {
    const filteredLeaders = leaders.filter(l => l.type === leader.type);
    if (index === filteredLeaders.length - 1) return;

    const nextLeader = filteredLeaders[index + 1];

    try {
      await fetch(`/api/admin/leaders/${leader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...leader, order_index: nextLeader.order_index }),
      });

      await fetch(`/api/admin/leaders/${nextLeader.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...nextLeader, order_index: leader.order_index }),
      });

      loadLeaders();
    } catch (error) {
      setMessage('Failed to reorder leaders');
      setMessageType('error');
    }
  };

  if (!mounted || loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  const mainLeaders = leaders.filter(l => l.type === 'main');
  const officials = leaders.filter(l => l.type === 'official');
  const displayLeaders = currentTab === 0 ? mainLeaders : officials;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => router.push('/admin/dashboard')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
            Manage Leaders
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Leader
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {message && (
          <Alert severity={messageType} onClose={() => setMessage('')} sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <Tabs value={currentTab} onChange={(_, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
          <Tab label={`Main Leaders (${mainLeaders.length})`} />
          <Tab label={`Officials (${officials.length})`} />
        </Tabs>

        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 3 }}>
          {displayLeaders.map((leader, index) => (
            <Card key={leader.id} sx={{ position: 'relative' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DragIndicator sx={{ mr: 1, color: 'text.secondary' }} />
                  {leader.image_url ? (
                    <Avatar src={leader.image_url} alt={leader.name} sx={{ width: 80, height: 80, mr: 2 }} />
                  ) : (
                    <Avatar sx={{ width: 80, height: 80, mr: 2, bgcolor: 'primary.main' }}>
                      {leader.name.charAt(0)}
                    </Avatar>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6">{leader.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{leader.designation}</Typography>
                    <Chip label={leader.type} size="small" sx={{ mt: 0.5 }} />
                  </Box>
                </Box>
                {leader.description && (
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {leader.description.length > 100
                      ? `${leader.description.substring(0, 100)}...`
                      : leader.description}
                  </Typography>
                )}
                {(leader.facebook_url || leader.whatsapp_url) && (
                  <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                    {leader.facebook_url && <Chip label="Facebook" size="small" color="primary" />}
                    {leader.whatsapp_url && <Chip label="WhatsApp" size="small" color="success" />}
                  </Stack>
                )}
              </CardContent>
              <CardActions>
                <IconButton size="small" onClick={() => handleMoveUp(leader, index)} disabled={index === 0}>
                  <ArrowUpward />
                </IconButton>
                <IconButton size="small" onClick={() => handleMoveDown(leader, index)} disabled={index === displayLeaders.length - 1}>
                  <ArrowDownward />
                </IconButton>
                <Box sx={{ flex: 1 }} />
                <IconButton color="primary" onClick={() => handleOpenDialog(leader)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(leader.id)}>
                  <DeleteIcon />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>

        {displayLeaders.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary">
              No {currentTab === 0 ? 'main leaders' : 'officials'} yet
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
              sx={{ mt: 2 }}
            >
              Add {currentTab === 0 ? 'Main Leader' : 'Official'}
            </Button>
          </Box>
        )}
      </Container>

      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>{editingLeader ? 'Edit Leader' : 'Add Leader'}</DialogTitle>
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
                id="image-upload"
                type="file"
                onChange={handleFileUpload}
              />
              <label htmlFor="image-upload">
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
              {formData.image_url && (
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Avatar src={formData.image_url} sx={{ width: 120, height: 120, mx: 'auto' }} />
                </Box>
              )}
            </Box>
            <TextField
              label="Facebook URL"
              value={formData.facebook_url}
              onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
              placeholder="https://facebook.com/..."
              fullWidth
            />
            <TextField
              label="WhatsApp URL"
              value={formData.whatsapp_url}
              onChange={(e) => setFormData({ ...formData, whatsapp_url: e.target.value })}
              placeholder="https://wa.me/..."
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.name || !formData.designation}
          >
            {editingLeader ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
