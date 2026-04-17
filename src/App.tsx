import { useState } from "react";
import EpisodeList from "./EpisodeList";
import PodcastList from "./PodcastList";
import type { Podcast } from "./types";

const App = () => {
  const [activePodcast, setActivePodcast] = useState<Podcast>();
  return (
    <>
      <PodcastList setActivePodcast={setActivePodcast}></PodcastList>
      {activePodcast && (
        <EpisodeList activePodcast={activePodcast}></EpisodeList>
      )}
    </>
  );
};

export default App;
