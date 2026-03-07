import { useEffect, useState } from "react";
import { getRSSTitle } from "./lib/rss";
import type { Podcast } from "./types";

type PodcastListProps = {
  setActivePodcast: (arg0: Podcast) => void;
};

const PodcastList = (props: PodcastListProps) => {
  const { setActivePodcast } = props;
  const [podcasts, setPodcasts] = useState<Podcast[]>(
    JSON.parse(localStorage.getItem("podcasts") ?? "[]"),
  );
  useEffect(() => {
    localStorage.setItem("podcasts", JSON.stringify(podcasts));
  }, [podcasts]);

  const urlSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const userInput = formData.get("url") ?? "";
    if (userInput === "") {
      return;
    }

    addPodcast(userInput as string);

    e.target.reset();
  };

  const deletePodcast = (cast: Podcast) => {
    setPodcasts(podcasts.filter((p) => p.url !== cast.url));
  };

  const addPodcast = async (url: string) => {
    const newPodcast: Podcast = { name: await getRSSTitle(url), url: url };
    setPodcasts([...podcasts, newPodcast]);
  };

  return (
    <>
      <form onSubmit={urlSubmit}>
        <input type="text" name="url" placeholder="URL..." autoComplete="off" />
        <button type="submit">Add</button>
      </form>
      <div>
        {podcasts.map((podcast) => {
          return (
            <div key={podcast.url}>
              <button type="button" onClick={() => setActivePodcast(podcast)}>
                {podcast.name}
              </button>
              <button type="button" onClick={() => deletePodcast(podcast)}>
                X
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PodcastList;
