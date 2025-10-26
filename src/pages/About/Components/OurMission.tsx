import React from "react";
import { Box, Typography, Divider } from '@mui/material'

const OurMission: React.FC = () => {
return(
    <Box
        sx={{
            p: 3,
            m: 2,
            backgroundColor: 'background.paper',
            borderRadius: 2,
            boxShadow: 1,
            border: '1px solid',
            borderColor: 'divider',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
                boxShadow: 4,
                transform: 'translateY(-2px)',
            },
        }}
    >
        <Typography variant="h4" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Our Mission - Connecting People to Christ
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
            We, Mahanaim Pentecostal Church aims to bring Jesus into the lives of all those in our immediate area – but we sincerely believe we have been called to spread the message of Jesus love throughout the world and we can't just confine our activities to our postcode! The word of Jesus is known as the Good News and if you have good news you must share it. This is very much at the heart of what we believe and we action our beliefs by setting 50% of our income to spread the gospel and practical help and support all around the world, as well as helping many people in need locally, and the rest 50% for ministries day by day work.
        </Typography>
    </Box>
)
}

export default OurMission;