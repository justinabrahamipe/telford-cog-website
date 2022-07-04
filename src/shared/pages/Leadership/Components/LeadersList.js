import React from "react";
import pr_biju_cherian from "../../../images/photos/Photos/pr_biju_cherian.jpg";
import br_rejoy from "../../../images/photos/Photos/br_rejoy_stephan.jpg";
import br_linu_thomas from  "../../../images/photos/Photos/br_linu_thomas.jpg";
import sr_neethu_mary_mathew from  "../../../images/photos/Photos/sr_neethu_rejoy.jpg";
import sr_suja_biju from  "../../../images/photos/Photos/sr_suja_biju.jpg";
import "./LeadersList.css";
import LeaderItem from "./LeaderItem";

const LeadersList = function (props) {
  return (
    <div className="LeadersList">
      <LeaderItem
        image={pr_biju_cherian}
        name="Pr. Biju Cherian"
        designation="Pastor"
        decription='He was born in India and trained as a counsellor for Alcohol and Drug Addicts in Mumbai. He counselled in a number of chemically dependant people in India before responding to God’s call to become a Pentecostal Minister in the UK. His wife is Suja Cherian and God gave them two boys Reuben and Ryan. He has been ministering to the  Church of God UK, for more than a decade. For 11 years he pastored in Birkenhead Church of God and then  pastoring Manchester Mahanaim Church of God since January 2017. God helped him to plant two churches in 2 different counties, Keighley and Telford.'
        socialMedia = {true}
        fb='https://www.facebook.com/bijujoseph.cherian'
        wa='https://wa.me/447411539877'
     />

      <LeaderItem
        image={br_rejoy}
        name="Br. Rejoy Stephan"
        designation="Worship Leader"
        decription='He was born as the son of Pr. Francis Stephan and Eliyamma Stephan at Thrissur, India. From his very young age itself his parents encouraged him to indulge in Sunday school, distributing tracts, outreach ministries and has taught him that toiling in his vineyard is the best thing in the world. They have prayed and supported him to grow in faith.
        As his parents were getting transferred to different places as part of the ministry, he studied in different schools. He learnt keyboard and did sound mixing at this time which helped his father in his ministry. 
        He graduated from Peniel Bible Seminary, Perumbavoor in 2012. From his college times itself he had a good time leading the worship under Pr. Sabu Samuel (Malampuzha Church, Palakad), Pr. N. G. Samkutty (Church of God Gospel Centre, Palarivattom), Pr. Saji M George (Bethlehem Community Church, Thrissur), Pr. Daniel Ayiroor (Voice of Gospel Church, Thrissur) and in many conventions and camps.
        He moved to Wellington, Telford, UK with family and since then he is the part of Mahanaim Church of God. On July 03,2021, by Gods grace a branch of Mahanaim COG came into being in Telford. He is assisting Pr. Biju Cherian in Gods ministry. Wife : Neethu Mary Mathew. Son : Evan Rejoy'
        socialMedia = {true}
        fb='https://www.facebook.com/rejoystephan.thadathil'
      wa='https://wa.me/447404535362'
      />

<LeaderItem
        image={br_linu_thomas}
        name="Br. Linu Thomas"
        designation="Youth Secretary"
        decription='Son of Mr. V. Thomas and Mrs. Alice Thomas was born in Delhi, India natively from Adoor, India. Though his maternal family is from Pentecostal, he used to go to Marthoma church until the age of 30. In the year of 2016 he went to Masirah, a small island in Oman, where he learned about the truth of baptism and its importance. He is a nurse by profession. He came to the UK in March 2022 and has been a part of Mahanaim CoG, Telford since then. Within this short time itself he has proved to be well determined and passionate towards the work of God. Despite language barriers he is not afraid to proclaim Gods word.
        His wife Merlin Mathew, Jerome (son) and Serah (daughter).'
        socialMedia = {true}
        fb='https://www.facebook.com/linuthomas911'
        wa='https://wa.me/447721687207 '
      />

<LeaderItem
        image={sr_suja_biju}
        name="Sis. Suja Cherian"
        designation="Ladies Secretary"
        decription='She is basically from Kottayam, India. She did her nursing at Bangalore and migrated to UK in 2000 and has been working in Wirral Teaching NHS Hospital since then. She has secured B.Sc.(Hons.) and Masters in Advanced Nurse Practice from University of Chester and is working as a Band-7 nurse. She is married to Pr. Biju Cherian and is blessed with 2 children, Reuben and Ryan. She has been the Ladies coordinater at Birkenhead Church of God and continue to do the same at Manchester Mahanaim Church of God. She is a prayer warrior and has been a great support to the church growth.'
        socialMedia = {true}
        fb='https://www.facebook.com/bijujoseph.cherian'
        wa='https://wa.me/447886897349'
      />

<LeaderItem
        image={sr_neethu_mary_mathew}
        name="Sis. Neethu Mary Mathew"
        designation="Ladies Secretary"
        decription='Born as a child of Mr. and Mrs. Mathew in Palakkad, India. Until her 15 years of age she was part of Syrian Orthodox Church and thereafter God blessed her to find out the true doctrine and hence followed path of Jesus Christ which changed her life. She was an active participant in all the church ministries and served as Sunday school teacher and youth coordinator in her own capacities. She has done her graduation in nursing at Simet College of Nursing, Palakkad. She migrated to UK in 2020 and was blessed to be one of the pioneer member of Mahanaim Church of God, Telford. She is married to Br. Rejoy Stephan and God has blessed them with a boy child, Evan.'
        socialMedia = {true}
        fb='https://www.facebook.com/neethumary.mathew.7'
        wa='https://wa.me/447459495028'
      />

{/* <LeaderItem
        image={sunday_school_teachers}
        name="Sundayschool teachers"
        designation="Sundayschool teachers"
        decription=''
        socialMedia = {false}
      /> */}
    </div>
  );
};

export default LeadersList;
