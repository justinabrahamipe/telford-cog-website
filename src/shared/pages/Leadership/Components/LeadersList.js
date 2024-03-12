import React from "react";
import pr_biju_cherian from "../../../images/photos/Photos/pr_biju_cherian.jpg";
import br_rejoy from "../../../images/photos/leaders/Rejoy.jpg";
import br_linu_thomas from "../../../images/photos/Photos/br_linu_thomas.jpg";
import Gijo from "../../../images/photos/leaders/Gijo George.jpg";
import Merlin from "../../../images/photos/leaders/Merlin.jpg";
import Neethu from "../../../images/photos/leaders/Neethu.jpg";
import Renu from "../../../images/photos/leaders/Renu.jpg";
import Shyju from "../../../images/photos/leaders/Shyju.jpg";
import Tijo from "../../../images/photos/leaders/Tijo.jpg";

import "./LeadersList.css";
import LeaderItem from "./LeaderItem";

const LeadersList = function (props) {
  return (
    <div className="LeadersList">
      <LeaderItem
        image={pr_biju_cherian}
        name="Pastor Biju Cherian"
        designation="Senior pastor"
      />
      <LeaderItem
        image={br_rejoy}
        name="Pastor Rejoy Stephan"
        designation="Pastor"
      />
      <LeaderItem image={Gijo} name="Br. Gijo George" designation="Treasurer" />
      <LeaderItem
        image={Shyju}
        name="Br. Shyju Mathew"
        designation="Treasurer  & YPE secretary"
      />
      <LeaderItem
        image={Merlin}
        name="Sis. Merlin Mathew"
        designation="Sunday School"
      />
      <LeaderItem
        image={Neethu}
        name="Sis. Neethu Rejoy"
        designation="Ladies Secretary"
      />
      <LeaderItem image={""} name="Br. Prince Titus" designation="Media" />
      <LeaderItem image={Tijo} name="Br. Tijo" designation="Music" />
      <LeaderItem
        image={br_linu_thomas}
        name="Br. Linu Thomas"
        designation="Administration"
      />

      <LeaderItem image={Renu} name="Sis. Renu" designation="Safeguarding" />

      <LeaderItem image={""} name="Br. Mathew" designation="Safeguarding" />
    </div>
  );
};

export default LeadersList;
