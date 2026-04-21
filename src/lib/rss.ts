import { XMLParser } from "fast-xml-parser";
import type { EpisodeData } from "../types";

/**
 * Takes an RSS URL and returns the name of the podcast.
 */
export const getRSSTitle = async (url: string) => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const parser = new XMLParser();
  const data = parser.parse(await response.text());
  return data.rss.channel.title;
}

/**
 * Takes an RSS URL and returns an array of EpisodeData objects.
 */
export const getRSSEpisodes = async (url: string) => {
  const response = await fetch(url);
  if(!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  const parser = new XMLParser({ ignoreAttributes: false});
  const data = parser.parse(await response.text());
  const episodes: EpisodeData[] = [];
  for(var episode of data.rss.channel.item) {
    episodes.push({name: episode.title, id: episode["omny:clipId"], description: episode.description, link: episode["media:content"][0]["@_url"]})
  }
  return episodes;
}