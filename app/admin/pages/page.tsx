'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import {
  Box,
  Container,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Grid,
  Paper,
} from '@mui/material';
import { ArrowBack, Save as SaveIcon, Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';

// Dynamically import TiptapEditor to avoid SSR issues
const TiptapEditor = dynamic(() => import('./TiptapEditor'), { ssr: false });

const PAGE_OPTIONS = [
  { value: 'home', label: 'Home Page' },
  { value: 'about', label: 'About Page' },
  { value: 'contact', label: 'Contact Page' },
  { value: 'leadership', label: 'Leadership Page' },
  { value: 'sermons', label: 'Sermons Page' },
  { value: 'gallery', label: 'Gallery Page' },
];

interface Section {
  id: string;
  title: string;
  content: string;
}

interface PageContent {
  heading?: string;
  subheading?: string;
  description?: string;
  mainContent?: string;
  sections?: Section[];
  [key: string]: any;
}

export default function AdminPagesEditor() {
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState('home');
  const [pageTitle, setPageTitle] = useState('');
  const [heading, setHeading] = useState('');
  const [subheading, setSubheading] = useState('');
  const [description, setDescription] = useState('');
  const [mainContent, setMainContent] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    checkAuth();
  }, []);

  useEffect(() => {
    if (!loading) {
      loadPage(selectedPage);
    }
  }, [selectedPage, loading]);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/check');
      const data = await response.json();

      if (!data.authenticated) {
        router.push('/admin/login');
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const loadPage = async (slug: string) => {
    try {
      const response = await fetch(`/api/admin/pages/${slug}`);
      const data = await response.json();

      if (response.ok && data.page) {
        setPageTitle(data.page.title);
        const content: PageContent = data.page.content;
        setHeading(content.heading || '');
        setSubheading(content.subheading || '');
        setDescription(content.description || '');
        setMainContent(content.mainContent || '');
        setSections(content.sections || []);
      } else {
        // Page doesn't exist yet, set defaults
        setPageTitle(PAGE_OPTIONS.find(p => p.value === slug)?.label || '');
        setHeading('');
        setSubheading('');
        setDescription('');
        setMainContent('');
        setSections([]);
      }
    } catch (error) {
      console.error('Error loading page:', error);
      setMessage('Failed to load page content');
      setMessageType('error');
    }
  };

  const handleSave = async () => {
    try {
      const contentObj: PageContent = {
        heading,
        subheading,
        description,
        mainContent,
        sections,
      };

      const response = await fetch('/api/admin/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: selectedPage,
          title: pageTitle,
          content: contentObj,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage('Page saved successfully!');
        setMessageType('success');
      } else {
        setMessage(data.error || 'Failed to save page');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setMessage('Failed to save page');
      setMessageType('error');
    }
  };

  const addSection = () => {
    setSections([...sections, { id: Date.now().toString(), title: '', content: '' }]);
  };

  const updateSection = (id: string, field: 'title' | 'content', value: string) => {
    setSections(sections.map(section =>
      section.id === id ? { ...section, [field]: value } : section
    ));
  };

  const deleteSection = (id: string) => {
    setSections(sections.filter(section => section.id !== id));
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted || loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static">
        <Toolbar>
          <Button
            color="inherit"
            startIcon={<ArrowBack />}
            onClick={() => router.push('/admin/dashboard')}
          >
            Back to Dashboard
          </Button>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            Page Content Editor
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <FormControl fullWidth>
                  <InputLabel>Select Page</InputLabel>
                  <Select
                    value={selectedPage}
                    label="Select Page"
                    onChange={(e) => setSelectedPage(e.target.value)}
                  >
                    {PAGE_OPTIONS.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Page Title"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {message && (
          <Alert severity={messageType} sx={{ mb: 3 }} onClose={() => setMessage('')}>
            {message}
          </Alert>
        )}

        {/* Basic Page Info */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Basic Information
          </Typography>
          <Grid container spacing={3}>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Page Heading"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                placeholder="Main heading for the page"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                label="Subheading"
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                placeholder="Optional subheading"
              />
            </Grid>
            <Grid size={12}>
              <TextField
                fullWidth
                multiline
                rows={2}
                label="Short Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description or tagline"
              />
            </Grid>
          </Grid>
        </Paper>

        {/* Main Content */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Main Content
          </Typography>
          <Typography variant="body2" color="text.secondary" paragraph>
            Format your content with bold, italics, headings, lists, and more.
          </Typography>
          <TiptapEditor
            content={mainContent}
            onChange={setMainContent}
            placeholder="Write your main page content here..."
            minHeight="300px"
          />
        </Paper>

        {/* Additional Sections */}
        <Paper sx={{ p: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">
              Additional Sections
            </Typography>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={addSection}
            >
              Add Section
            </Button>
          </Box>

          {sections.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
              No additional sections yet. Click "Add Section" to create one.
            </Typography>
          )}

          {sections.map((section, index) => (
            <Card key={section.id} sx={{ mb: 2, p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Section {index + 1}
                </Typography>
                <Button
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => deleteSection(section.id)}
                >
                  Delete
                </Button>
              </Box>

              <TextField
                fullWidth
                label="Section Title"
                value={section.title}
                onChange={(e) => updateSection(section.id, 'title', e.target.value)}
                sx={{ mb: 2 }}
              />

              <TiptapEditor
                content={section.content}
                onChange={(value) => updateSection(section.id, 'content', value)}
                placeholder="Section content..."
                minHeight="200px"
              />
            </Card>
          ))}
        </Paper>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mb: 4 }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/admin/dashboard')}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            size="large"
          >
            Save Page
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
