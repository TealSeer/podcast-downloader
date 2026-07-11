import { useEffect, useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { ItemGroup } from "./components/ui/item";
import { ScrollArea } from "./components/ui/scroll-area";
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

  useEffect(() => {
    const getEpisodes = async () => {
      const eps = await getRSSEpisodes(activePodcast.url);
      setEpisodes(eps);
    };
    getEpisodes();
  }, [activePodcast]);

  return (
    <ScrollArea className="h-screen">
      <ItemGroup>
        {episodes.map((episode) => {
          return (
            <Episode
              data={episode}
              key={episode.id}
              listenedEpisodes={listenedEpisodes}
              setListenedEpisodes={setListenedEpisodes}
            />
          );
        })}
      </ItemGroup>
    </ScrollArea>
  );
};

export default EpisodeList;
