import React from "react";

const SermonVideos: React.FC = () => (
  <div className="sermon_parent_div">
       {/* -------------------------------------------------------------------------------------------------------------------- */}
    <div className="sermon_item_div">
      <div>
        <div>
          <h4>Message by Rev. Dr. Joe Kurian</h4>
        </div>
        <br></br>
        <iframe
          //   width="560"
          //   height="315"
          className="youtube_frame"
          src="https://www.youtube.com/embed/tbqpn4LgzLQ"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br></br>
        <div className="description">
          This message was given at the church on his Apostolic visit in 2022.
        </div>
      </div>
    </div>
    {/* -------------------------------------------------------------------------------------------------------------------- */}

    {/* -------------------------------------------------------------------------------------------------------------------- */}
    <div className="sermon_item_div">
      <div>
        <div>
          <h4>Song by Br. Gypson Roshan</h4>
        </div>
        <br></br>
        <iframe
          //   width="560"
          //   height="315"
          className="youtube_frame"
          src="https://www.youtube.com/embed/SJQ08HpdLrc"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br></br>
        <div className="description"></div>
      </div>
    </div>
    {/* -------------------------------------------------------------------------------------------------------------------- */}

    {/* -------------------------------------------------------------------------------------------------------------------- */}
    <div className="sermon_item_div">
      <div>
        <div>
          <h4>Message by Pr. Biju Cherian</h4>
        </div>
        <br></br>
        <iframe
          //   width="560"
          //   height="315"
          className="youtube_frame"
          src="https://www.youtube.com/embed/_YR1pjEQXoM"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br></br>
        <div className="description">Power of Prayer</div>
      </div>
    </div>
    {/* -------------------------------------------------------------------------------------------------------------------- */}

    {/* -------------------------------------------------------------------------------------------------------------------- */}
    <div className="sermon_item_div">
      <div>
        <div>
          <h4>Message by Pr. Sabu Samuel</h4>
        </div>
        <br></br>
        <iframe
          className="youtube_frame"
          src="https://www.youtube.com/embed/ZU2ET_aF7a4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br></br>
        <div className="description">The Parable of the Talents - Part 1</div>
      </div>
    </div>
    {/* -------------------------------------------------------------------------------------------------------------------- */}
    {/* -------------------------------------------------------------------------------------------------------------------- */}
    <div className="sermon_item_div">
      <div>
        <div>
          <h4>Message by Pr. Sabu Samuel</h4>
        </div>
        <br></br>
        <iframe
          className="youtube_frame"
          src="https://www.youtube.com/embed/e0vo93UW9jU"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
        <br></br>
        <div className="description">The Parable of the Talents - Part 2</div>
      </div>
    </div>
    {/* -------------------------------------------------------------------------------------------------------------------- */}
  </div>
);

export default SermonVideos;