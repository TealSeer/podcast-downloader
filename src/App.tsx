import { useState } from "react";
import EpisodeList from "./EpisodeList";
import PodcastList from "./PodcastList";
import type { Podcast } from "./types";

const App = () => {
  const [activePodcast, setActivePodcast] = useState<Podcast>();
  return (
    <div className="flex gap-2.5">
      <div className="flex-2/12">
        <PodcastList setActivePodcast={setActivePodcast}></PodcastList>
      </div>
      <div className="flex-10/12">
        {activePodcast && (
          <EpisodeList activePodcast={activePodcast}></EpisodeList>
        )}
      </div>
    </div>
  );
};

export default App;
