import { useLocalStorage } from "usehooks-ts";
import { Button } from "./components/ui/button";
import { Field } from "./components/ui/field";
import { Input } from "./components/ui/input";
import { getRSSTitle } from "./lib/rss";
import type { Podcast } from "./types";

type PodcastListProps = {
  setActivePodcast: (arg0: Podcast) => void;
};

const PodcastList = (props: PodcastListProps) => {
  const { setActivePodcast } = props;
  const [podcasts, setPodcasts] = useLocalStorage<Podcast[]>("podcasts", []);

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
    <div>
      <form onSubmit={urlSubmit}>
        <Field>
          <Input
            type="text"
            name="url"
            placeholder="URL..."
            autoComplete="off"
          />
          <Button type="submit">Add</Button>
        </Field>
      </form>
      <div>
        {podcasts.map((podcast) => {
          return (
            <div className="flex" key={podcast.url}>
              <Button
                type="button"
                className="flex-1"
                onClick={() => setActivePodcast(podcast)}
              >
                {podcast.name}
              </Button>
              <Button type="button" onClick={() => deletePodcast(podcast)}>
                X
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PodcastList;
