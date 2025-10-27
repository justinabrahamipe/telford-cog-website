import React from 'react'
import { Box, Container } from '@mui/material'
import OurVision from './OurVision'
import StatementOfFaith from './StatementOfFaith'
import History from './History'
import OurMission from './OurMission'
import OurValues from './OurValues'

const AboutUsContent: React.FC = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <OurVision/>
      <OurMission />
      <OurValues />
      <StatementOfFaith />
      <History />
    </Box>
  </Container>
)

export default AboutUsContent