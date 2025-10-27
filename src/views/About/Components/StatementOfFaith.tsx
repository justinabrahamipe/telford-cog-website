import React from "react";
import { Box, Typography, Divider } from '@mui/material'

const StatementOfFaith: React.FC = () => {
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
            Our Statement of Faith
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="body1" sx={{ lineHeight: 1.7, color: 'text.secondary', textAlign: 'justify' }}>
            This statement describes the fundamental beliefs held by the Church and its members have a set of doctrines which reflect our faith as Christians. Each person of the Trinity, the Father, Son and Holy Spirit being co-equal, co-eternal and in perfect unity in the one Godhead and that there is no other true or living God. The sovereignty of God in Creation, Providence, Redemption and His Righteousness in Final judgment. The divine inspiration and entire infallibility of the Bible (both the Old and New Testaments) as originally given and its supreme authority in all matters of faith and conduct. Sinfulness and guilt of human nature since the fall, rendering man subject to God's righteous anger and judgment. The forgiveness of sins and freedom from the guilt penalty and power of sin solely through the sacrificial death of our Lord Jesus Christ in our place, and the gift of eternal life to all who believe in him. The incarnation and the Virgin Birth of our Lord Jesus Christ, His sinless life, His miraculous ministry, His resurrection from the dead, His ascension into heaven to be our mediator and the certainty of His visible and personal return with great glory. The necessity of the work of the Holy Spirit to make the death of our Lord Jesus Christ effective to the individual sinner, giving new spiritual birth without which no-one can enter the Kingdom of God. The Life of the Holy Spirit within believers, to make them holy and more like our Lord Jesus Christ and to enable them to act and live as true children of God. The one Universal Church which is the Body of Christ and to which all true believers belong. Baptism for believers as the only baptism commanded by our Lord Jesus Christ practiced by the apostles and taught in the New Testament. Each local church is a part of the Body of Christ; made up of a group of believers who have a personal faith in our Lord Jesus Christ and who have gathered together in fellowship for worship and service. Each local Church is free under the guidance and control of the Holy Spirit to interpret and to act on the Bible's teaching which is sufficient to order its life and for it to obey our Lord Jesus Christ. The outpouring of the Holy Spirit as promised by our risen Lord Jesus Christ and the availability of this Baptism in the Spirit to all believers giving them the power to be witnesses and equipping them with spiritual gifts for service.
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, fontStyle: 'italic', color: 'primary.main' }}>
            1 Corinthians 3:6 Apostle Paul says, "I planted the seed, Apollos watered it, but God made it grow. So neither he who plants nor he who waters is anything, but only God who makes things grow."
        </Typography>
    </Box>
)
}

export default StatementOfFaith;