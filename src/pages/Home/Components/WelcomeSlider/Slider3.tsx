import React from "react";
import "./WelcomeSlider.css";

const Slider3: React.FC = () => {
  return (
    <div className="Slider3_ParentDiv">

      <div className="slider-verse-parent">
        <div className="slider-verse">
          ദൈവത്തിന്റെ വചനം ജീവനും ചൈതന്യവുമുള്ളതായി ഇരുവായ്ത്തലയുള്ള ഏതു
          വാളിനെക്കാളും മൂർച്ചയേറിയതും പ്രാണനെയും ആത്മാവിനെയും സന്ധിമജ്ജകളെയും
          വേർവിടുവിക്കുംവരെ തുളച്ചുചെല്ലുന്നതും ഹൃദയത്തിലെ ചിന്തനങ്ങളെയും
          ഭാവങ്ങളെയും വിവേചിക്കുന്നതും ആകുന്നു.
        </div>
        <div className="slider-verse-reference">എബ്രായർ 4:12</div>
      </div>

      <div className="slider-verse-parent">
        <div className="slider-verse">
          For the word of God is quick, and powerful, and sharper than any two
          edged sword, piercing even to the dividing asunder of soul and spirit,
          and of the joints and marrow, and is a discerner of the thoughts and
          intents of the heart.
        </div>
        <div className="slider-verse-reference">Hebrews 4:12</div>
      </div>
    </div>
  );
};

export default Slider3;