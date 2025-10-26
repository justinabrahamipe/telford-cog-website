import React from "react";
import { Box, Typography, Divider } from '@mui/material'

const OurVision: React.FC = () => {
    return (
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
                OUR VISION
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
                To be a healthy, growing and prayerful church which is led by the Holy Spirit and where the Bible is studied and applied and we want to see the{' '}
                <Typography component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    TRANSFORMATION
                </Typography>{' '}
                of Telford and the surrounding area by the{' '}
                <Typography component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    POWER OF THE HOLY SPIRIT
                </Typography>
                , who is active to{' '}
                <Typography component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    SAVE, HEAL and DELIVER
                </Typography>
                .
            </Typography>
        </Box>
    )
}

export default OurVision;