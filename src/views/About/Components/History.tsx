import React from "react";
import { Box, Typography, Divider } from '@mui/material'
import { EditableSection } from '../../../components/EditMode/EditableSection'

const History: React.FC = () => {
return(
    <EditableSection
        sectionId="about-history"
        pageSlug="about"
        title="History"
        content="<p>Mahanaim Pentecostal Church is a bilingual Malayalam and English Church located in Telford. We are a Bible believing Malayalam Pentecostal Church, worshipping God in Spirit and in truth. We find church as an instrument to proclaim <strong>THE GOOD NEWS</strong> of Jesus Christ to the lost world. Evangelization of the lost world and Edification of its members are the main purposes of the church. Mahanaim Pentecostal Church Telford had a humble beginning in one of our church member's residents in the year 2021. Since then, God's hand is building the church in the midst of powers of this dark world and devil's schemes. In January 2017, Pastor Biju Cherian (Founder of Merseyside Revival Ministries) took over the charge of the Mahanaim Church of God, Manchester and is ministering with the grace and strength God provides.</p>"
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
            History
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary' }}>
            Mahanaim Pentecostal Church is a bilingual Malayalam and English Church located in Telford. We are a Bible believing Malayalam Pentecostal Church, worshipping God in Spirit and in truth. We find church as an instrument to proclaim{' '}
            <Typography component="span" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                THE GOOD NEWS
            </Typography>{' '}
            of Jesus Christ to the lost world. Evangelization of the lost world and Edification of its members are the main purposes of the church. Mahanaim Pentecostal Church Telford had a humble beginning in one of our church member's residents in the year 2021. Since then, God's hand is building the church in the midst of powers of this dark world and devil's schemes. In January 2017, Pastor Biju Cherian (Founder of Merseyside Revival Ministries) took over the charge of the Mahanaim Church of God, Manchester and is ministering with the grace and strength God provides.
        </Typography>
    </Box>
    </EditableSection>
)
}

export default History;