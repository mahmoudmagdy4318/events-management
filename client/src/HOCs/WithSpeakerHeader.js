import React from "react";
import SpeakerHeader from "../components/speakersHeader";
const WithSpeakerHeader = (Comp) => (props) => (
  <>
    <SpeakerHeader {...props} />
    <Comp {...props} />
  </>
);

export default WithSpeakerHeader;
