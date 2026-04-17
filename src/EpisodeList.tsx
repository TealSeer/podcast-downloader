import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import Episode from "./Episode";
import { getRSSEpisodes } from "./lib/rss";
import type { EpisodeData, Podcast } from "./types";

type EpisodeListProps = {
  activePodcast: Podcast;
};

const EpisodeList = (props: EpisodeListProps) => {
  const { activePodcast } = props;
  const [episodes, setEpisodes] = useState<EpisodeData[]>([]);

  // An empty map gets deserialized as an object unless we explicitly handle it
  const [listenedEpisodes, setListenedEpisodes] = useLocalStorage<
    Map<string, boolean>
  >(activePodcast.name, new Map<string, boolean>(), {
    serializer: (val) => JSON.stringify(Object.fromEntries(val)),
    deserializer: (val) =>
      new Map<string, boolean>(Object.entries(JSON.parse(val))),
  });

  const toggleListened = (id: string, newVal: boolean) => {
    const newMap = new Map<string, boolean>(listenedEpisodes);
    newVal ? newMap.set(id, true) : newMap.delete(id);
    setListenedEpisodes(newMap);
  };

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
          <Episode
            data={episode}
            key={episode.id}
            toggleListener={toggleListened}
            listened={listenedEpisodes.get(episode.id) ?? false}
          />
        );
      })}
    </div>
  );
};

export default EpisodeList;
