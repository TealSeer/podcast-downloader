import { useState } from "react";
import EpisodeList from "./EpisodeList";
import PodcastList from "./PodcastList";
import type { Podcast } from "./types";

const App = () => {
  const [activePodcast, setActivePodcast] = useState<Podcast>();
  return (
    <>
      <span>
        <PodcastList setActivePodcast={setActivePodcast}></PodcastList>
      </span>
      <span>
        <EpisodeList activePodcast={activePodcast}></EpisodeList>
      </span>
    </>
  );
};

export default App;
