import React from "react";
import { Container, Typography, Box } from "@mui/material";
import br_rejoy from "../../../assets/photos/Photos/br_rejoy_stephan.jpg";
import pr_biju_cherian from "../../../assets/photos/Photos/pr_biju_cherian.jpg";
import sr_neethu_mary_mathew from "../../../assets/photos/Photos/sr_neethu_rejoy.jpg";
import sr_suja_biju from "../../../assets/photos/Photos/sr_suja_biju.jpg";
import LeaderItem from "./LeaderItem";
import { EditableSection } from "../../../components/EditMode/EditableSection";

// Helper function to handle both string and StaticImageData types
const getImageSrc = (img: any): string => {
  if (typeof img === 'string') {
    return img;
  }
  return img.src || img;
};

const LeadersList: React.FC = () => {
  return (
    <Container maxWidth="xl" sx={{ px: 0, py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
          mb: 6,
        }}
      >
        <EditableSection
          sectionId="leader-biju-cherian"
          pageSlug="leadership"
          title="Pr. Biju Cherian"
          content="<p><strong>Senior pastor, Mahanaim Church of God. Midland region supervisor, COG-UKCCM</strong></p><p>He was born in India and trained as a counsellor for Alcohol and Drug Addicts in Mumbai. He counselled in a number of chemically dependant people in India before responding to God's call to become a Pentecostal Minister in the UK. His wife is Suja Cherian and God gave them two boys Reuben and Ryan. He has been ministering to the Church of God UK, for more than a decade. For 11 years he pastored in Birkenhead Church of God and then pastoring Manchester Mahanaim Church of God since January 2017. God helped him to plant two churches in 2 different counties, Keighley and Telford.</p>"
        >
          <LeaderItem
            image={getImageSrc(pr_biju_cherian)}
            name="Pr. Biju Cherian"
            designation={
              <span>
                <span>Senior pastor, Mahanaim Church of God</span>
                <br /> <span> Midland region supervisor, COG-UKCCM</span>
              </span>
            }
            description="He was born in India and trained as a counsellor for Alcohol and Drug Addicts in Mumbai. He counselled in a number of chemically dependant people in India before responding to God's call to become a Pentecostal Minister in the UK. His wife is Suja Cherian and God gave them two boys Reuben and Ryan. He has been ministering to the  Church of God UK, for more than a decade. For 11 years he pastored in Birkenhead Church of God and then  pastoring Manchester Mahanaim Church of God since January 2017. God helped him to plant two churches in 2 different counties, Keighley and Telford."
            socialMedia={true}
            fb="https://www.facebook.com/bijujoseph.cherian"
            wa="https://wa.me/447411539877"
          />
        </EditableSection>
        <EditableSection
          sectionId="leader-rejoy-stephan"
          pageSlug="leadership"
          title="Pr. Rejoy Stephan"
          content="<p><strong>Pastor</strong></p><p>He was born as the son of Pr. Francis Stephan and Eliyamma Stephan at Thrissur, India. From his very young age itself his parents encouraged him to indulge in Sunday school, distributing tracts, outreach ministries and has taught him that toiling in his vineyard is the best thing in the world. They have prayed and supported him to grow in faith. As his parents were getting transferred to different places as part of the ministry, he studied in different schools. He learnt keyboard and did sound mixing at this time which helped his father in his ministry. He graduated from Peniel Bible Seminary, Perumbavoor in 2012. From his college times itself he had a good time leading the worship under Pr. Sabu Samuel (Malampuzha Church, Palakad), Pr. N. G. Samkutty (Church of God Gospel Centre, Palarivattom), Pr. Saji M George (Bethlehem Community Church, Thrissur), Pr. Daniel Ayiroor (Voice of Gospel Church, Thrissur) and in many conventions and camps. He moved to Wellington, Telford, UK with family and since then he is the part of Mahanaim Church of God. On July 03,2021, by Gods grace a branch of Mahanaim COG came into being in Telford. He is assisting Pr. Biju Cherian in Gods ministry. Wife : Neethu Mary Mathew. Son : Evan Rejoy</p>"
        >
          <LeaderItem
            image={getImageSrc(br_rejoy)}
            name="Pr. Rejoy Stephan"
            designation="Pastor"
            description="He was born as the son of Pr. Francis Stephan and Eliyamma Stephan at Thrissur, India. From his very young age itself his parents encouraged him to indulge in Sunday school, distributing tracts, outreach ministries and has taught him that toiling in his vineyard is the best thing in the world. They have prayed and supported him to grow in faith.
        As his parents were getting transferred to different places as part of the ministry, he studied in different schools. He learnt keyboard and did sound mixing at this time which helped his father in his ministry.
        He graduated from Peniel Bible Seminary, Perumbavoor in 2012. From his college times itself he had a good time leading the worship under Pr. Sabu Samuel (Malampuzha Church, Palakad), Pr. N. G. Samkutty (Church of God Gospel Centre, Palarivattom), Pr. Saji M George (Bethlehem Community Church, Thrissur), Pr. Daniel Ayiroor (Voice of Gospel Church, Thrissur) and in many conventions and camps.
        He moved to Wellington, Telford, UK with family and since then he is the part of Mahanaim Church of God. On July 03,2021, by Gods grace a branch of Mahanaim COG came into being in Telford. He is assisting Pr. Biju Cherian in Gods ministry. Wife : Neethu Mary Mathew. Son : Evan Rejoy"
            socialMedia={true}
            fb="https://www.facebook.com/profile.php?id=100095378197419"
            wa="https://wa.me/447404535362"
          />
        </EditableSection>
        <EditableSection
          sectionId="leader-suja-cherian"
          pageSlug="leadership"
          title="Sis. Suja Cherian"
          content="<p><strong>Ladies Secretary</strong></p><p>She is basically from Kottayam, India. She did her nursing at Bangalore and migrated to UK in 2000 and has been working in Wirral Teaching NHS Hospital since then. She has secured B.Sc.(Hons.) and Masters in Advanced Nurse Practice from University of Chester and is working as a Band-7 nurse. She is married to Pr. Biju Cherian and is blessed with 2 children, Reuben and Ryan. She has been the Ladies coordinater at Birkenhead Church of God and continue to do the same at Manchester Mahanaim Church of God. She is a prayer warrior and has been a great support to the church growth.</p>"
        >
          <LeaderItem
            image={getImageSrc(sr_suja_biju)}
            name="Sis. Suja Cherian"
            designation="Ladies Secretary"
            description="She is basically from Kottayam, India. She did her nursing at Bangalore and migrated to UK in 2000 and has been working in Wirral Teaching NHS Hospital since then. She has secured B.Sc.(Hons.) and Masters in Advanced Nurse Practice from University of Chester and is working as a Band-7 nurse. She is married to Pr. Biju Cherian and is blessed with 2 children, Reuben and Ryan. She has been the Ladies coordinater at Birkenhead Church of God and continue to do the same at Manchester Mahanaim Church of God. She is a prayer warrior and has been a great support to the church growth."
            socialMedia={true}
            fb="https://www.facebook.com/bijujoseph.cherian"
            wa="https://wa.me/447886897349"
          />
        </EditableSection>
        <EditableSection
          sectionId="leader-neethu-mathew"
          pageSlug="leadership"
          title="Sis. Neethu Mary Mathew"
          content="<p><strong>Ladies Secretary</strong></p><p>Born as a child of Mr. and Mrs. Mathew in Palakkad, India. Until her 15 years of age she was part of Syrian Orthodox Church and thereafter God blessed her to find out the true doctrine and hence followed path of Jesus Christ which changed her life. She was an active participant in all the church ministries and served as Sunday school teacher and youth coordinator in her own capacities. She has done her graduation in nursing at Simet College of Nursing, Palakkad. She migrated to UK in 2020 and was blessed to be one of the pioneer member of Mahanaim Church of God, Telford. She is married to Br. Rejoy Stephan and God has blessed them with a boy child, Evan.</p>"
        >
          <LeaderItem
            image={getImageSrc(sr_neethu_mary_mathew)}
            name="Sis. Neethu Mary Mathew"
            designation="Ladies Secretary"
            description="Born as a child of Mr. and Mrs. Mathew in Palakkad, India. Until her 15 years of age she was part of Syrian Orthodox Church and thereafter God blessed her to find out the true doctrine and hence followed path of Jesus Christ which changed her life. She was an active participant in all the church ministries and served as Sunday school teacher and youth coordinator in her own capacities. She has done her graduation in nursing at Simet College of Nursing, Palakkad. She migrated to UK in 2020 and was blessed to be one of the pioneer member of Mahanaim Church of God, Telford. She is married to Br. Rejoy Stephan and God has blessed them with a boy child, Evan."
            socialMedia={true}
            fb="https://www.facebook.com/neethumary.mathew.7"
            wa="https://wa.me/447459495028"
          />
        </EditableSection>
      </Box>

      <Typography
        variant="h2"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 600,
          color: 'text.primary',
          textAlign: 'center',
          mb: 4,
          mt: 6,
        }}
      >
        Our Officials
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 2,
        }}
      >
        <LeaderItem
          name="Br. Linu Thomas"
          designation="Administration"
          socialMedia={false}
        />
        <LeaderItem
          name="Br. Gijo George"
          designation="Treasurer"
          socialMedia={false}
        />
        <LeaderItem
          name="Br. Shyju Mathew"
          designation="Worship leader"
          socialMedia={false}
        />
        <LeaderItem
          name="Sis. Sini Shyju"
          designation="Sunday school coordinator"
          socialMedia={false}
        />
        <LeaderItem
          name="Br. Sam Mathai"
          designation="YPE Secretary"
          socialMedia={false}
        />
        <LeaderItem
          name="Sis. Raji Joby"
          designation="Ladies coordinator"
          socialMedia={false}
        />
        <LeaderItem
          name="Br. Linu Thomas & Sis. Tinku"
          designation="Prayer coordinator"
          socialMedia={false}
        />
        <LeaderItem
          name="Br. Prince Titus"
          designation="Media coordinator"
          socialMedia={false}
        />
        <LeaderItem
          name="Sis. Renu Chandy"
          designation="Safeguarding officer"
          socialMedia={false}
        />
      </Box>
    </Container>
  );
};

export default LeadersList;