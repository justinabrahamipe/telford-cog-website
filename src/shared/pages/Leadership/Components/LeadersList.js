import React from "react";
import br_rejoy from "../../../images/photos/Photos/br_rejoy_stephan.jpg";
import pr_biju_cherian from "../../../images/photos/Photos/pr_biju_cherian.jpg";
import sr_neethu_mary_mathew from "../../../images/photos/Photos/sr_neethu_rejoy.jpg";
import sr_suja_biju from "../../../images/photos/Photos/sr_suja_biju.jpg";
import LeaderItem from "./LeaderItem";
import "./LeadersList.css";

const LeadersList = function (props) {
  return (
    <div className="LeadersListHolder">
      <div className="LeadersList">
        <LeaderItem
          image={pr_biju_cherian}
          name="Pr. Biju Cherian"
          designation={
            <span>
              <span>Senior pastor, Mahanaim Church of God</span>
              <br /> <span> Midland region supervisor, COG-UKCCM</span>
            </span>
          }
          decription="He was born as the son of Pr. Francis Stephan and Eliyamma Stephan at Thrissur, India. From his very young age itself his parents encouraged him to indulge in Sunday school, distributing tracts, outreach ministries and has taught him that toiling in his vineyard is the best thing in the world. They have prayed and supported him to grow in faith.
        As his parents were getting transferred to different places as part of the ministry, he studied in different schools. He learnt keyboard and did sound mixing at this time which helped his father in his ministry. 
        He graduated from Peniel Bible Seminary, Perumbavoor in 2012. From his college times itself he had a good time leading the worship under Pr. Sabu Samuel (Malampuzha Church, Palakad), Pr. N. G. Samkutty (Church of God Gospel Centre, Palarivattom), Pr. Saji M George (Bethlehem Community Church, Thrissur), Pr. Daniel Ayiroor (Voice of Gospel Church, Thrissur) and in many conventions and camps.
        He moved to Wellington, Telford, UK with family and since then he is the part of Mahanaim Church of God. On July 03,2021, by Gods grace a branch of Mahanaim COG came into being in Telford. He is assisting Pr. Biju Cherian in Gods ministry. Wife : Neethu Mary Mathew. Son : Evan Rejoy"
          socialMedia={true}
          fb="https://www.facebook.com/bijujoseph.cherian"
          wa="https://wa.me/447411539877"
        />
        <LeaderItem
          image={br_rejoy}
          name="Pr. Rejoy Stephan"
          designation="Pastor"
          decription="He was born as the son of Pr. Francis Stephan and Eliyamma Stephan at Thrissur, India. From his very young age itself his parents encouraged him to indulge in Sunday school, distributing tracts, outreach ministries and has taught him that toiling in his vineyard is the best thing in the world. They have prayed and supported him to grow in faith.
        As his parents were getting transferred to different places as part of the ministry, he studied in different schools. He learnt keyboard and did sound mixing at this time which helped his father in his ministry. 
        He graduated from Peniel Bible Seminary, Perumbavoor in 2012. From his college times itself he had a good time leading the worship under Pr. Sabu Samuel (Malampuzha Church, Palakad), Pr. N. G. Samkutty (Church of God Gospel Centre, Palarivattom), Pr. Saji M George (Bethlehem Community Church, Thrissur), Pr. Daniel Ayiroor (Voice of Gospel Church, Thrissur) and in many conventions and camps.
        He moved to Wellington, Telford, UK with family and since then he is the part of Mahanaim Church of God. On July 03,2021, by Gods grace a branch of Mahanaim COG came into being in Telford. He is assisting Pr. Biju Cherian in Gods ministry. Wife : Neethu Mary Mathew. Son : Evan Rejoy"
          socialMedia={true}
          fb="https://www.facebook.com/profile.php?id=100095378197419"
          wa="https://wa.me/447404535362"
        />{" "}
        <LeaderItem
          image={sr_suja_biju}
          name="Sis. Suja Cherian"
          designation="Ladies Secretary"
          decription="She is basically from Kottayam, India. She did her nursing at Bangalore and migrated to UK in 2000 and has been working in Wirral Teaching NHS Hospital since then. She has secured B.Sc.(Hons.) and Masters in Advanced Nurse Practice from University of Chester and is working as a Band-7 nurse. She is married to Pr. Biju Cherian and is blessed with 2 children, Reuben and Ryan. She has been the Ladies coordinater at Birkenhead Church of God and continue to do the same at Manchester Mahanaim Church of God. She is a prayer warrior and has been a great support to the church growth."
          socialMedia={true}
          fb="https://www.facebook.com/bijujoseph.cherian"
          wa="https://wa.me/447886897349"
        />
        <LeaderItem
          image={sr_neethu_mary_mathew}
          name="Sis. Neethu Mary Mathew"
          designation="Ladies Secretary"
          decription="Born as a child of Mr. and Mrs. Mathew in Palakkad, India. Until her 15 years of age she was part of Syrian Orthodox Church and thereafter God blessed her to find out the true doctrine and hence followed path of Jesus Christ which changed her life. She was an active participant in all the church ministries and served as Sunday school teacher and youth coordinator in her own capacities. She has done her graduation in nursing at Simet College of Nursing, Palakkad. She migrated to UK in 2020 and was blessed to be one of the pioneer member of Mahanaim Church of God, Telford. She is married to Br. Rejoy Stephan and God has blessed them with a boy child, Evan."
          socialMedia={true}
          fb="https://www.facebook.com/neethumary.mathew.7"
          wa="https://wa.me/447459495028"
        />
      </div>
      <h2 className="officials-header">Our officials</h2>
      <div className="LeadersList">
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
      </div>
    </div>
  );
};

export default LeadersList;
