import { useEffect, useState } from "react";
import { getRSSEpisodes } from "./lib/rss";
import type { Episode, Podcast } from "./types";

type EpisodeListProps = {
  activePodcast?: Podcast;
};

const EpisodeList = (props: EpisodeListProps) => {
  const { activePodcast } = props;
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  useEffect(() => {
    if (activePodcast === undefined) {
      setEpisodes([]);
      return;
    }
    const getEpisodes = async () => {
      const eps = await getRSSEpisodes(activePodcast.url);
      setEpisodes(eps);
    };
    getEpisodes();
  }, [activePodcast]);

  return episodes.map((episode) => {
    return (
      <div key={episode.id}>
        <a href={episode.link} download>
          {episode.name}
        </a>
      </div>
    );
  });
};

export default EpisodeList;
