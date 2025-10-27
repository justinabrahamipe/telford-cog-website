import React from "react";
import { Box, Typography, Divider, List, ListItem, ListItemText } from '@mui/material'
import { EditableSection } from '../../../components/EditMode/EditableSection'

const OurValues: React.FC = () => {
return(
    <EditableSection
        sectionId="about-values"
        pageSlug="about"
        title="Our Values"
        content="<p>We have four Values that really motivate us:</p><ol><li>Love : for every individual</li><li>Faith : that impacts daily life</li><li>Service : that shows God's love</li><li>Commitment : to the Lord & His Church</li></ol>"
        isDeletable={true}
    >
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
            Our Values
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary', mb: 2 }}>
            We have four Values that really motivate us:
        </Typography>
        <List sx={{ pl: 0 }}>
            <ListItem sx={{ px: 0 }}>
                <ListItemText
                    primary="1. Love : for every individual"
                    sx={{ '& .MuiListItemText-primary': { color: 'text.secondary', fontWeight: 500 } }}
                />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
                <ListItemText
                    primary="2. Faith : that impacts daily life"
                    sx={{ '& .MuiListItemText-primary': { color: 'text.secondary', fontWeight: 500 } }}
                />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
                <ListItemText
                    primary="3. Service : that shows God's love"
                    sx={{ '& .MuiListItemText-primary': { color: 'text.secondary', fontWeight: 500 } }}
                />
            </ListItem>
            <ListItem sx={{ px: 0 }}>
                <ListItemText
                    primary="4. Commitment : to the Lord & His Church"
                    sx={{ '& .MuiListItemText-primary': { color: 'text.secondary', fontWeight: 500 } }}
                />
            </ListItem>
        </List>
    </Box>
    </EditableSection>
)
}

export default OurValues;