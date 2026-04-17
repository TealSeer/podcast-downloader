import { useEffect, useState } from "react";
import Episode from "./Episode";
import { getRSSEpisodes } from "./lib/rss";
import type { EpisodeData, Podcast } from "./types";

type EpisodeListProps = {
  activePodcast: Podcast;
};

const EpisodeList = (props: EpisodeListProps) => {
  const { activePodcast } = props;
  const [episodes, setEpisodes] = useState<EpisodeData[]>([]);

  useEffect(() => {
    const getEpisodes = async () => {
      const eps = await getRSSEpisodes(activePodcast.url);
      setEpisodes(eps);
    };
    getEpisodes();
  }, [activePodcast]);

  return (
    <div>
      {episodes.map((episode) => {
        return <Episode data={episode} key={episode.id} />;
      })}
    </div>
  );
};

export default EpisodeList;
