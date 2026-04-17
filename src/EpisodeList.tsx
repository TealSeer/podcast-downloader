import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
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
        return (
          <details key={episode.id} style={{ border: "1px solid" }}>
            <summary>
              <a href={episode.link} download>
                {episode.name}
              </a>
            </summary>
            <div
              // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized with DOMPurify
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(episode.description),
              }}
            ></div>
          </details>
        );
      })}
    </div>
  );
};

export default EpisodeList;
