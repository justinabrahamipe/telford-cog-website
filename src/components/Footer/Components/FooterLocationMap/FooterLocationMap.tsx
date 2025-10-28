'use client';

import React, { useState, useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import "./FooterLocationMap.css";

const FooterLocationMap: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [mapEmbedUrl, setMapEmbedUrl] = useState('');

  useEffect(() => {
    loadMapUrl();
  }, []);

  const loadMapUrl = async () => {
    try {
      const response = await fetch('/api/admin/footer-settings');
      const data = await response.json();
      if (response.ok && data.google_maps_embed_url) {
        let embedUrl = data.google_maps_embed_url;

        // If it's a full iframe HTML, extract the src URL
        if (embedUrl.includes('<iframe')) {
          const srcMatch = embedUrl.match(/src="([^"]+)"/);
          if (srcMatch && srcMatch[1]) {
            embedUrl = srcMatch[1];
          }
        }

        setMapEmbedUrl(embedUrl);
      } else {
        // Fallback to default embed URL if not set
        setMapEmbedUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2417.6734771831666!2d-2.519048484185737!3d52.70198837984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf437dbe101dede3e!2sMahanaim%20Pentecostal%20Church%20of%20God%20Telford%20(Malayalam%20and%20English%20Service)!5e0!3m2!1sen!2suk!4v1652964867706!5m2!1sen!2suk');
      }
    } catch (error) {
      console.error('Error loading map URL:', error);
      // Fallback to default
      setMapEmbedUrl('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2417.6734771831666!2d-2.519048484185737!3d52.70198837984909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xf437dbe101dede3e!2sMahanaim%20Pentecostal%20Church%20of%20God%20Telford%20(Malayalam%20and%20English%20Service)!5e0!3m2!1sen!2suk!4v1652964867706!5m2!1sen!2suk');
    } finally {
      setLoading(false);
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
    <div className="google-map-code">
      <iframe
        title='google map location'
        src={mapEmbedUrl}
        width="100%"
        height="300"
        frameBorder="0"
        style={{ border: 0, maxWidth: '350px' }}
        allowFullScreen={true}
        aria-hidden="false"
        tabIndex={0}
      ></iframe>
    </div>
  );
};

export default FooterLocationMap;