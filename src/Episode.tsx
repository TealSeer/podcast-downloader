import { ArrowSquareOutIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { Button } from "./components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "./components/ui/item";
import { lengthString } from "./lib/utils";
import type { EpisodeData } from "./types";

type EpisodeProps = {
  data: EpisodeData;
  listenedEpisodes: Map<string, boolean>;
  setListenedEpisodes: (arg0: Map<string, boolean>) => void;
};

const Episode = (props: EpisodeProps) => {
  const { listenedEpisodes, setListenedEpisodes } = props;
  const { name, id, date, length, description, link } = props.data;
  const isChecked = listenedEpisodes.get(id) ?? false;

  const toggleListened = () => {
    const newMap = new Map<string, boolean>(listenedEpisodes);
    isChecked ? newMap.delete(id) : newMap.set(id, true);
    setListenedEpisodes(newMap);
  };

  return (
    <Item>
      <ItemContent>
        <ItemTitle>{name}</ItemTitle>
        <ItemDescription>{`${date.toLocaleDateString()} | ${lengthString(length)}`}</ItemDescription>
      </ItemContent>
      <ItemActions>
        <Button onClick={toggleListened}>
          <CheckCircleIcon color={isChecked ? "green" : "red"} />
        </Button>
        <Button onClick={() => window.open(link)}>
          <ArrowSquareOutIcon />
        </Button>
      </ItemActions>
    </Item>
  );
};

export default Episode;
