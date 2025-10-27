'use client';

import React, { useState, useEffect } from 'react'
import { Box, Container, CircularProgress } from '@mui/material'
import DynamicSection from './DynamicSection'
import { AddSectionButton } from '../../../components/EditMode/AddSectionButton'

interface Section {
  id: string;
  title: string;
  content: string;
  order?: number;
}

// Default sections configuration
const defaultSections: Section[] = [
  {
    id: 'about-vision',
    title: 'Our Vision',
    content: '<p>To be a healthy, growing and prayerful church which is led by the Holy Spirit and where the Bible is studied and applied and we want to see the <strong>TRANSFORMATION</strong> of Telford and the surrounding area by the <strong>POWER OF THE HOLY SPIRIT</strong>, who is active to <strong>SAVE, HEAL and DELIVER</strong>.</p>',
    order: 1,
  },
  {
    id: 'about-mission',
    title: 'Our Mission',
    content: '<p>We, Mahanaim Pentecostal Church aims to bring Jesus into the lives of all those in our immediate area – but we sincerely believe we have been called to spread the message of Jesus love throughout the world and we can\'t just confine our activities to our postcode! The word of Jesus is known as the Good News and if you have good news you must share it. This is very much at the heart of what we believe and we action our beliefs by setting 50% of our income to spread the gospel and practical help and support all around the world, as well as helping many people in need locally, and the rest 50% for ministries day by day work.</p>',
    order: 2,
  },
  {
    id: 'about-values',
    title: 'Our Values',
    content: '<p>We have four Values that really motivate us:</p><ol><li>Love : for every individual</li><li>Faith : that impacts daily life</li><li>Service : that shows God\'s love</li><li>Commitment : to the Lord & His Church</li></ol>',
    order: 3,
  },
  {
    id: 'about-statement-of-faith',
    title: 'Statement of Faith',
    content: '<p>This statement describes the fundamental beliefs held by the Church and its members have a set of doctrines which reflect our faith as Christians. Each person of the Trinity, the Father, Son and Holy Spirit being co-equal, co-eternal and in perfect unity in the one Godhead and that there is no other true or living God. The sovereignty of God in Creation, Providence, Redemption and His Righteousness in Final judgment. The divine inspiration and entire infallibility of the Bible (both the Old and New Testaments) as originally given and its supreme authority in all matters of faith and conduct. Sinfulness and guilt of human nature since the fall, rendering man subject to God\'s righteous anger and judgment. The forgiveness of sins and freedom from the guilt penalty and power of sin solely through the sacrificial death of our Lord Jesus Christ in our place, and the gift of eternal life to all who believe in him. The incarnation and the Virgin Birth of our Lord Jesus Christ, His sinless life, His miraculous ministry, His resurrection from the dead, His ascension into heaven to be our mediator and the certainty of His visible and personal return with great glory. The necessity of the work of the Holy Spirit to make the death of our Lord Jesus Christ effective to the individual sinner, giving new spiritual birth without which no-one can enter the Kingdom of God. The Life of the Holy Spirit within believers, to make them holy and more like our Lord Jesus Christ and to enable them to act and live as true children of God. The one Universal Church which is the Body of Christ and to which all true believers belong. Baptism for believers as the only baptism commanded by our Lord Jesus Christ practiced by the apostles and taught in the New Testament. Each local church is a part of the Body of Christ; made up of a group of believers who have a personal faith in our Lord Jesus Christ and who have gathered together in fellowship for worship and service. Each local Church is free under the guidance and control of the Holy Spirit to interpret and to act on the Bible\'s teaching which is sufficient to order its life and for it to obey our Lord Jesus Christ. The outpouring of the Holy Spirit as promised by our risen Lord Jesus Christ and the availability of this Baptism in the Spirit to all believers giving them the power to be witnesses and equipping them with spiritual gifts for service.</p><p><em>1 Corinthians 3:6 Apostle Paul says, "I planted the seed, Apollos watered it, but God made it grow. So neither he who plants nor he who waters is anything, but only God who makes things grow."</em></p>',
    order: 4,
  },
  {
    id: 'about-history',
    title: 'History',
    content: '<p>Mahanaim Pentecostal Church is a bilingual Malayalam and English Church located in Telford. We are a Bible believing Malayalam Pentecostal Church, worshipping God in Spirit and in truth. We find church as an instrument to proclaim <strong>THE GOOD NEWS</strong> of Jesus Christ to the lost world. Evangelization of the lost world and Edification of its members are the main purposes of the church. Mahanaim Pentecostal Church Telford had a humble beginning in one of our church member\'s residents in the year 2021. Since then, God\'s hand is building the church in the midst of powers of this dark world and devil\'s schemes. In January 2017, Pastor Biju Cherian (Founder of Merseyside Revival Ministries) took over the charge of the Mahanaim Church of God, Manchester and is ministering with the grace and strength God provides.</p>',
    order: 5,
  },
];

const AboutUsContent: React.FC = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSections = async () => {
      try {
        const response = await fetch('/api/admin/pages/about');
        if (response.ok) {
          const data = await response.json();
          const dbSections = data.page?.content?.sections || [];

          // Merge default sections with database sections
          const mergedSections = defaultSections.map(defaultSection => {
            const dbSection = dbSections.find((s: Section) => s.id === defaultSection.id);
            return dbSection || defaultSection;
          });

          // Add any additional custom sections from database
          const customSections = dbSections.filter(
            (section: Section) => !defaultSections.some(ds => ds.id === section.id)
          );

          setSections([...mergedSections, ...customSections]);
        } else {
          // If page doesn't exist, use defaults
          setSections(defaultSections);
        }
      } catch (error) {
        console.error('Error loading sections:', error);
        setSections(defaultSections);
      } finally {
        setLoading(false);
      }
    };

    loadSections();
  }, []);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}>
        {/* Render all sections dynamically */}
        {sections.map((section) => (
          <DynamicSection
            key={section.id}
            sectionId={section.id}
            pageSlug="about"
            title={section.title}
            content={section.content}
            isDeletable={true}
          />
        ))}

        {/* Add Section Button (only visible in edit mode) */}
        <AddSectionButton pageSlug="about" />
      </Box>
    </Container>
  )
}

export default AboutUsContent